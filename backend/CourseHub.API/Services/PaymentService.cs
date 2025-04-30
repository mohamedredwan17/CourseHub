using System.Text;
using CourseHub.API.Data;
using CourseHub.API.Models;
using CourseHub.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Stripe;
using Stripe.Checkout;

namespace CourseHub.API.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        private readonly string _stripeSecretKey;
        private readonly string _stripeWebhookSecret;
        private readonly string _currency;

        public PaymentService(ApplicationDbContext context, IConfiguration configuration, IEmailService emailService)
        {
            _context = context;
            _configuration = configuration;
            _emailService = emailService;
            _stripeSecretKey = _configuration["Payment:StripeSecretKey"];
            _stripeWebhookSecret = _configuration["Payment:StripeWebhookSecret"];
            _currency = _configuration["Payment:Currency"] ?? "USD";

            StripeConfiguration.ApiKey = _stripeSecretKey;
        }

        public async Task<Payment> CreatePaymentAsync(string userId, decimal amount, string description, string? subscriptionId = null)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                throw new Exception("المستخدم غير موجود");

            var payment = new Payment
            {
                UserId = userId,
                Amount = amount,
                Description = description,
                Status = PaymentStatus.Pending,
                CreatedAt = DateTime.UtcNow,
                SubscriptionId = subscriptionId
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return payment;
        }

        public async Task<Payment> GetPaymentAsync(string paymentId)
        {
            var payment = await _context.Payments
                .Include(p => p.User)
                .Include(p => p.Subscription)
                .FirstOrDefaultAsync(p => p.Id == paymentId);

            if (payment == null)
                throw new Exception("الدفعة غير موجودة");

            return payment;
        }

        public async Task<IEnumerable<Payment>> GetUserPaymentsAsync(string userId)
        {
            return await _context.Payments
                .Include(p => p.Subscription)
                .Where(p => p.UserId == userId)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<Payment>> GetSubscriptionPaymentsAsync(string subscriptionId)
        {
            return await _context.Payments
                .Include(p => p.User)
                .Where(p => p.SubscriptionId == subscriptionId)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        public async Task<bool> ProcessPaymentAsync(string paymentId, string paymentMethodId)
        {
            var payment = await GetPaymentAsync(paymentId);
            if (payment.Status != PaymentStatus.Pending)
                return false;

            try
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = (long)(payment.Amount * 100), // تحويل المبلغ إلى سنتات
                    Currency = _currency,
                    PaymentMethod = paymentMethodId,
                    Confirm = true,
                    ReturnUrl = $"{_configuration["BaseUrl"]}/payment/success/{paymentId}",
                    CancelUrl = $"{_configuration["BaseUrl"]}/payment/cancel/{paymentId}"
                };

                var service = new PaymentIntentService();
                var intent = await service.CreateAsync(options);

                if (intent.Status == "succeeded")
                {
                    payment.Status = PaymentStatus.Completed;
                    payment.TransactionId = intent.Id;
                    payment.CompletedAt = DateTime.UtcNow;
                    await _context.SaveChangesAsync();

                    // إرسال بريد تأكيد الدفع
                    await _emailService.SendPaymentConfirmationAsync(
                        payment.User.Email,
                        payment.Amount.ToString("C"),
                        payment.Description
                    );

                    return true;
                }
            }
            catch (StripeException ex)
            {
                payment.Status = PaymentStatus.Failed;
                payment.FailureReason = ex.Message;
                await _context.SaveChangesAsync();
            }

            return false;
        }

        public async Task<bool> CancelPaymentAsync(string paymentId)
        {
            var payment = await GetPaymentAsync(paymentId);
            if (payment.Status != PaymentStatus.Pending)
                return false;

            payment.Status = PaymentStatus.Cancelled;
            payment.CancelledAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> RefundPaymentAsync(string paymentId, decimal? amount = null)
        {
            var payment = await GetPaymentAsync(paymentId);
            if (payment.Status != PaymentStatus.Completed || string.IsNullOrEmpty(payment.TransactionId))
                return false;

            try
            {
                var options = new RefundCreateOptions
                {
                    PaymentIntent = payment.TransactionId,
                    Amount = amount.HasValue ? (long)(amount.Value * 100) : null
                };

                var service = new RefundService();
                await service.CreateAsync(options);

                payment.Status = PaymentStatus.Refunded;
                payment.RefundedAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();

                return true;
            }
            catch (StripeException)
            {
                return false;
            }
        }

        public async Task<PaymentStats> GetPaymentStatsAsync(DateTime? startDate = null, DateTime? endDate = null)
        {
            var query = _context.Payments.AsQueryable();

            if (startDate.HasValue)
                query = query.Where(p => p.CreatedAt >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(p => p.CreatedAt <= endDate.Value);

            var stats = new PaymentStats
            {
                TotalRevenue = await query.Where(p => p.Status == PaymentStatus.Completed).SumAsync(p => p.Amount),
                MonthlyRevenue = await query
                    .Where(p => p.Status == PaymentStatus.Completed && p.CreatedAt >= DateTime.UtcNow.AddMonths(-1))
                    .SumAsync(p => p.Amount),
                TotalPayments = await query.CountAsync(),
                SuccessfulPayments = await query.CountAsync(p => p.Status == PaymentStatus.Completed),
                FailedPayments = await query.CountAsync(p => p.Status == PaymentStatus.Failed),
                PendingPayments = await query.CountAsync(p => p.Status == PaymentStatus.Pending)
            };

            return stats;
        }

        public async Task<string> CreatePaymentIntentAsync(decimal amount, string currency, string? customerId = null)
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)(amount * 100),
                Currency = currency,
                Customer = customerId,
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                    Enabled = true
                }
            };

            var service = new PaymentIntentService();
            var intent = await service.CreateAsync(options);

            return intent.ClientSecret;
        }

        public async Task<bool> VerifyWebhookSignatureAsync(string payload, string signature)
        {
            try
            {
                var eventObject = EventUtility.ConstructEvent(
                    payload,
                    signature,
                    _stripeWebhookSecret
                );

                return eventObject != null;
            }
            catch
            {
                return false;
            }
        }
    }
} 