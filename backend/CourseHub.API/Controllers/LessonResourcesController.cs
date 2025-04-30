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
    public class LessonResourcesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LessonResourcesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/LessonResources
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LessonResource>>> GetLessonResources()
        {
            return await _context.LessonResources
                .Include(r => r.Lesson)
                .ToListAsync();
        }

        // GET: api/LessonResources/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LessonResource>> GetLessonResource(int id)
        {
            var lessonResource = await _context.LessonResources
                .Include(r => r.Lesson)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (lessonResource == null)
            {
                return NotFound();
            }

            return lessonResource;
        }

        // POST: api/LessonResources
        [HttpPost]
        public async Task<ActionResult<LessonResource>> CreateLessonResource(LessonResource lessonResource)
        {
            lessonResource.CreatedAt = DateTime.UtcNow;
            _context.LessonResources.Add(lessonResource);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLessonResource), new { id = lessonResource.Id }, lessonResource);
        }

        // PUT: api/LessonResources/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLessonResource(int id, LessonResource lessonResource)
        {
            if (id != lessonResource.Id)
            {
                return BadRequest();
            }

            lessonResource.UpdatedAt = DateTime.UtcNow;
            _context.Entry(lessonResource).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LessonResourceExists(id))
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

        // DELETE: api/LessonResources/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLessonResource(int id)
        {
            var lessonResource = await _context.LessonResources.FindAsync(id);
            if (lessonResource == null)
            {
                return NotFound();
            }

            _context.LessonResources.Remove(lessonResource);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/LessonResources/Lesson/5
        [HttpGet("Lesson/{lessonId}")]
        public async Task<ActionResult<IEnumerable<LessonResource>>> GetResourcesByLesson(int lessonId)
        {
            return await _context.LessonResources
                .Where(r => r.LessonId == lessonId)
                .OrderBy(r => r.Order)
                .ToListAsync();
        }

        // PUT: api/LessonResources/5/Reorder
        [HttpPut("{id}/Reorder")]
        public async Task<IActionResult> ReorderResource(int id, [FromBody] int newOrder)
        {
            var resource = await _context.LessonResources.FindAsync(id);
            if (resource == null)
            {
                return NotFound();
            }

            var resources = await _context.LessonResources
                .Where(r => r.LessonId == resource.LessonId)
                .OrderBy(r => r.Order)
                .ToListAsync();

            var oldOrder = resource.Order;
            if (newOrder < oldOrder)
            {
                foreach (var r in resources.Where(r => r.Order >= newOrder && r.Order < oldOrder))
                {
                    r.Order++;
                }
            }
            else if (newOrder > oldOrder)
            {
                foreach (var r in resources.Where(r => r.Order > oldOrder && r.Order <= newOrder))
                {
                    r.Order--;
                }
            }

            resource.Order = newOrder;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LessonResourceExists(int id)
        {
            return _context.LessonResources.Any(e => e.Id == id);
        }
    }
} 