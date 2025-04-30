using CourseHub.API.Models;

namespace CourseHub.API.Services.Interfaces
{
    public interface IPaymentService
    {
        Task<Payment> CreatePaymentAsync(string userId, decimal amount, string description, string? subscriptionId = null);
        Task<Payment> GetPaymentAsync(string paymentId);
        Task<IEnumerable<Payment>> GetUserPaymentsAsync(string userId);
        Task<IEnumerable<Payment>> GetSubscriptionPaymentsAsync(string subscriptionId);
        Task<bool> ProcessPaymentAsync(string paymentId, string paymentMethodId);
        Task<bool> CancelPaymentAsync(string paymentId);
        Task<bool> RefundPaymentAsync(string paymentId, decimal? amount = null);
        Task<PaymentStats> GetPaymentStatsAsync(DateTime? startDate = null, DateTime? endDate = null);
        Task<string> CreatePaymentIntentAsync(decimal amount, string currency, string? customerId = null);
        Task<bool> VerifyWebhookSignatureAsync(string payload, string signature);
    }

    public class PaymentStats
    {
        public decimal TotalRevenue { get; set; }
        public decimal MonthlyRevenue { get; set; }
        public int TotalPayments { get; set; }
        public int SuccessfulPayments { get; set; }
        public int FailedPayments { get; set; }
        public int PendingPayments { get; set; }
        public Dictionary<string, int> PaymentMethods { get; set; } = new();
    }
} 