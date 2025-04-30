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
    public class SubscriptionPlansController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SubscriptionPlansController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/SubscriptionPlans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubscriptionPlan>>> GetSubscriptionPlans()
        {
            return await _context.SubscriptionPlans
                .OrderBy(p => p.Price)
                .ToListAsync();
        }

        // GET: api/SubscriptionPlans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubscriptionPlan>> GetSubscriptionPlan(int id)
        {
            var plan = await _context.SubscriptionPlans.FindAsync(id);

            if (plan == null)
            {
                return NotFound();
            }

            return plan;
        }

        // POST: api/SubscriptionPlans
        [HttpPost]
        public async Task<ActionResult<SubscriptionPlan>> CreateSubscriptionPlan(SubscriptionPlan plan)
        {
            plan.CreatedAt = DateTime.UtcNow;
            _context.SubscriptionPlans.Add(plan);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSubscriptionPlan), new { id = plan.Id }, plan);
        }

        // PUT: api/SubscriptionPlans/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSubscriptionPlan(int id, SubscriptionPlan plan)
        {
            if (id != plan.Id)
            {
                return BadRequest();
            }

            plan.UpdatedAt = DateTime.UtcNow;
            _context.Entry(plan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubscriptionPlanExists(id))
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

        // DELETE: api/SubscriptionPlans/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubscriptionPlan(int id)
        {
            var plan = await _context.SubscriptionPlans.FindAsync(id);
            if (plan == null)
            {
                return NotFound();
            }

            // التحقق من وجود عضويات نشطة تستخدم هذا الخطة
            var activeSubscriptions = await _context.Subscriptions
                .CountAsync(s => s.PlanId == id && s.Status == SubscriptionStatus.Active);

            if (activeSubscriptions > 0)
            {
                return BadRequest("لا يمكن حذف خطة العضوية لأنها مستخدمة في عضويات نشطة");
            }

            _context.SubscriptionPlans.Remove(plan);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/SubscriptionPlans/Active
        [HttpGet("Active")]
        public async Task<ActionResult<IEnumerable<SubscriptionPlan>>> GetActivePlans()
        {
            return await _context.SubscriptionPlans
                .Where(p => p.IsActive)
                .OrderBy(p => p.Price)
                .ToListAsync();
        }

        // POST: api/SubscriptionPlans/5/Activate
        [HttpPost("{id}/Activate")]
        public async Task<IActionResult> ActivatePlan(int id)
        {
            var plan = await _context.SubscriptionPlans.FindAsync(id);
            if (plan == null)
            {
                return NotFound();
            }

            plan.IsActive = true;
            plan.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubscriptionPlanExists(id))
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

        // POST: api/SubscriptionPlans/5/Deactivate
        [HttpPost("{id}/Deactivate")]
        public async Task<IActionResult> DeactivatePlan(int id)
        {
            var plan = await _context.SubscriptionPlans.FindAsync(id);
            if (plan == null)
            {
                return NotFound();
            }

            plan.IsActive = false;
            plan.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubscriptionPlanExists(id))
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

        // GET: api/SubscriptionPlans/Stats
        [HttpGet("Stats")]
        public async Task<ActionResult<SubscriptionPlanStats>> GetPlanStats()
        {
            var totalPlans = await _context.SubscriptionPlans.CountAsync();
            var activePlans = await _context.SubscriptionPlans
                .CountAsync(p => p.IsActive);
            var inactivePlans = await _context.SubscriptionPlans
                .CountAsync(p => !p.IsActive);

            var mostPopularPlan = await _context.Subscriptions
                .GroupBy(s => s.PlanId)
                .Select(g => new { PlanId = g.Key, Count = g.Count() })
                .OrderByDescending(x => x.Count)
                .FirstOrDefaultAsync();

            var mostPopularPlanDetails = mostPopularPlan != null
                ? await _context.SubscriptionPlans.FindAsync(mostPopularPlan.PlanId)
                : null;

            return new SubscriptionPlanStats
            {
                TotalPlans = totalPlans,
                ActivePlans = activePlans,
                InactivePlans = inactivePlans,
                MostPopularPlan = mostPopularPlanDetails
            };
        }

        private bool SubscriptionPlanExists(int id)
        {
            return _context.SubscriptionPlans.Any(e => e.Id == id);
        }
    }

    public class SubscriptionPlanStats
    {
        public int TotalPlans { get; set; }
        public int ActivePlans { get; set; }
        public int InactivePlans { get; set; }
        public SubscriptionPlan MostPopularPlan { get; set; }
    }
} 