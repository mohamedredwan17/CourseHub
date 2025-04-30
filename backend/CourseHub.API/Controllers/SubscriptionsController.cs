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
    public class SubscriptionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SubscriptionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Subscriptions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subscription>>> GetSubscriptions()
        {
            return await _context.Subscriptions
                .Include(s => s.User)
                .Include(s => s.Plan)
                .OrderByDescending(s => s.CreatedAt)
                .ToListAsync();
        }

        // GET: api/Subscriptions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Subscription>> GetSubscription(int id)
        {
            var subscription = await _context.Subscriptions
                .Include(s => s.User)
                .Include(s => s.Plan)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (subscription == null)
            {
                return NotFound();
            }

            return subscription;
        }

        // POST: api/Subscriptions
        [HttpPost]
        public async Task<ActionResult<Subscription>> CreateSubscription(Subscription subscription)
        {
            subscription.CreatedAt = DateTime.UtcNow;
            subscription.Status = SubscriptionStatus.Active;
            subscription.StartDate = DateTime.UtcNow;
            subscription.EndDate = subscription.StartDate.AddMonths(subscription.Plan.DurationInMonths);
            _context.Subscriptions.Add(subscription);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSubscription), new { id = subscription.Id }, subscription);
        }

        // PUT: api/Subscriptions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSubscription(int id, Subscription subscription)
        {
            if (id != subscription.Id)
            {
                return BadRequest();
            }

            subscription.UpdatedAt = DateTime.UtcNow;
            _context.Entry(subscription).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubscriptionExists(id))
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

        // DELETE: api/Subscriptions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubscription(int id)
        {
            var subscription = await _context.Subscriptions.FindAsync(id);
            if (subscription == null)
            {
                return NotFound();
            }

            _context.Subscriptions.Remove(subscription);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Subscriptions/User/5
        [HttpGet("User/{userId}")]
        public async Task<ActionResult<IEnumerable<Subscription>>> GetUserSubscriptions(int userId)
        {
            return await _context.Subscriptions
                .Where(s => s.UserId == userId)
                .Include(s => s.Plan)
                .OrderByDescending(s => s.CreatedAt)
                .ToListAsync();
        }

        // GET: api/Subscriptions/User/5/Active
        [HttpGet("User/{userId}/Active")]
        public async Task<ActionResult<Subscription>> GetUserActiveSubscription(int userId)
        {
            var subscription = await _context.Subscriptions
                .Where(s => s.UserId == userId && s.Status == SubscriptionStatus.Active)
                .Include(s => s.Plan)
                .OrderByDescending(s => s.CreatedAt)
                .FirstOrDefaultAsync();

            if (subscription == null)
            {
                return NotFound();
            }

            return subscription;
        }

        // POST: api/Subscriptions/5/Renew
        [HttpPost("{id}/Renew")]
        public async Task<IActionResult> RenewSubscription(int id)
        {
            var subscription = await _context.Subscriptions
                .Include(s => s.Plan)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (subscription == null)
            {
                return NotFound();
            }

            subscription.StartDate = DateTime.UtcNow;
            subscription.EndDate = subscription.StartDate.AddMonths(subscription.Plan.DurationInMonths);
            subscription.Status = SubscriptionStatus.Active;
            subscription.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubscriptionExists(id))
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

        // POST: api/Subscriptions/5/Cancel
        [HttpPost("{id}/Cancel")]
        public async Task<IActionResult> CancelSubscription(int id)
        {
            var subscription = await _context.Subscriptions.FindAsync(id);
            if (subscription == null)
            {
                return NotFound();
            }

            subscription.Status = SubscriptionStatus.Cancelled;
            subscription.CancelledAt = DateTime.UtcNow;
            subscription.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubscriptionExists(id))
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

        // GET: api/Subscriptions/Stats
        [HttpGet("Stats")]
        public async Task<ActionResult<SubscriptionStats>> GetSubscriptionStats()
        {
            var totalSubscriptions = await _context.Subscriptions.CountAsync();
            var activeSubscriptions = await _context.Subscriptions
                .CountAsync(s => s.Status == SubscriptionStatus.Active);
            var cancelledSubscriptions = await _context.Subscriptions
                .CountAsync(s => s.Status == SubscriptionStatus.Cancelled);
            var expiredSubscriptions = await _context.Subscriptions
                .CountAsync(s => s.Status == SubscriptionStatus.Expired);

            var revenue = await _context.Subscriptions
                .Where(s => s.Status == SubscriptionStatus.Active)
                .SumAsync(s => s.Plan.Price);

            return new SubscriptionStats
            {
                TotalSubscriptions = totalSubscriptions,
                ActiveSubscriptions = activeSubscriptions,
                CancelledSubscriptions = cancelledSubscriptions,
                ExpiredSubscriptions = expiredSubscriptions,
                MonthlyRevenue = revenue
            };
        }

        private bool SubscriptionExists(int id)
        {
            return _context.Subscriptions.Any(e => e.Id == id);
        }
    }

    public class SubscriptionStats
    {
        public int TotalSubscriptions { get; set; }
        public int ActiveSubscriptions { get; set; }
        public int CancelledSubscriptions { get; set; }
        public int ExpiredSubscriptions { get; set; }
        public decimal MonthlyRevenue { get; set; }
    }
} 