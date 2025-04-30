using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CourseHub.API.Models;
using CourseHub.API.Data;

namespace CourseHub.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PaymentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Payments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Payment>>> GetPayments()
        {
            return await _context.Payments
                .Include(p => p.User)
                .Include(p => p.Subscription)
                .ThenInclude(s => s.Plan)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        // GET: api/Payments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Payment>> GetPayment(int id)
        {
            var payment = await _context.Payments
                .Include(p => p.User)
                .Include(p => p.Subscription)
                .ThenInclude(s => s.Plan)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (payment == null)
            {
                return NotFound();
            }

            return payment;
        }

        // POST: api/Payments
        [HttpPost]
        public async Task<ActionResult<Payment>> CreatePayment(Payment payment)
        {
            payment.CreatedAt = DateTime.UtcNow;
            payment.Status = PaymentStatus.Pending;
            payment.TransactionId = GenerateTransactionId();
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPayment), new { id = payment.Id }, payment);
        }

        // PUT: api/Payments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePayment(int id, Payment payment)
        {
            if (id != payment.Id)
            {
                return BadRequest();
            }

            payment.UpdatedAt = DateTime.UtcNow;
            _context.Entry(payment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Payments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null)
            {
                return NotFound();
            }

            _context.Payments.Remove(payment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Payments/User/5
        [HttpGet("User/{userId}")]
        public async Task<ActionResult<IEnumerable<Payment>>> GetUserPayments(int userId)
        {
            return await _context.Payments
                .Where(p => p.UserId == userId)
                .Include(p => p.Subscription)
                .ThenInclude(s => s.Plan)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        // GET: api/Payments/Subscription/5
        [HttpGet("Subscription/{subscriptionId}")]
        public async Task<ActionResult<IEnumerable<Payment>>> GetSubscriptionPayments(int subscriptionId)
        {
            return await _context.Payments
                .Where(p => p.SubscriptionId == subscriptionId)
                .Include(p => p.User)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        // POST: api/Payments/5/Complete
        [HttpPost("{id}/Complete")]
        public async Task<IActionResult> CompletePayment(int id, [FromBody] PaymentCompletionRequest request)
        {
            var payment = await _context.Payments
                .Include(p => p.Subscription)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (payment == null)
            {
                return NotFound();
            }

            payment.Status = PaymentStatus.Completed;
            payment.PaymentMethod = request.PaymentMethod;
            payment.TransactionReference = request.TransactionReference;
            payment.CompletedAt = DateTime.UtcNow;

            // تحديث حالة العضوية
            if (payment.Subscription != null)
            {
                payment.Subscription.Status = SubscriptionStatus.Active;
                payment.Subscription.StartDate = DateTime.UtcNow;
                payment.Subscription.EndDate = payment.Subscription.StartDate.AddMonths(payment.Subscription.Plan.DurationInMonths);
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Payments/5/Cancel
        [HttpPost("{id}/Cancel")]
        public async Task<IActionResult> CancelPayment(int id)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null)
            {
                return NotFound();
            }

            payment.Status = PaymentStatus.Cancelled;
            payment.CancelledAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // GET: api/Payments/Stats
        [HttpGet("Stats")]
        public async Task<ActionResult<PaymentStats>> GetPaymentStats()
        {
            var totalPayments = await _context.Payments.CountAsync();
            var totalRevenue = await _context.Payments
                .Where(p => p.Status == PaymentStatus.Completed)
                .SumAsync(p => p.Amount);
            var pendingPayments = await _context.Payments
                .CountAsync(p => p.Status == PaymentStatus.Pending);
            var completedPayments = await _context.Payments
                .CountAsync(p => p.Status == PaymentStatus.Completed);
            var cancelledPayments = await _context.Payments
                .CountAsync(p => p.Status == PaymentStatus.Cancelled);

            var monthlyRevenue = await _context.Payments
                .Where(p => p.Status == PaymentStatus.Completed && 
                           p.CompletedAt >= DateTime.UtcNow.AddMonths(-1))
                .SumAsync(p => p.Amount);

            return new PaymentStats
            {
                TotalPayments = totalPayments,
                TotalRevenue = totalRevenue,
                MonthlyRevenue = monthlyRevenue,
                PendingPayments = pendingPayments,
                CompletedPayments = completedPayments,
                CancelledPayments = cancelledPayments
            };
        }

        private string GenerateTransactionId()
        {
            var timestamp = DateTime.UtcNow.Ticks;
            var random = new Random();
            var randomNumber = random.Next(1000, 9999);
            return $"PAY-{timestamp}-{randomNumber}";
        }

        private bool PaymentExists(int id)
        {
            return _context.Payments.Any(e => e.Id == id);
        }
    }

    public class PaymentCompletionRequest
    {
        public string PaymentMethod { get; set; }
        public string TransactionReference { get; set; }
    }

    public class PaymentStats
    {
        public int TotalPayments { get; set; }
        public decimal TotalRevenue { get; set; }
        public decimal MonthlyRevenue { get; set; }
        public int PendingPayments { get; set; }
        public int CompletedPayments { get; set; }
        public int CancelledPayments { get; set; }
    }
} 