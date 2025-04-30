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
    public class LessonsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LessonsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Lessons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lesson>>> GetLessons()
        {
            return await _context.Lessons
                .Include(l => l.Module)
                .Include(l => l.Resources)
                .ToListAsync();
        }

        // GET: api/Lessons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Lesson>> GetLesson(int id)
        {
            var lesson = await _context.Lessons
                .Include(l => l.Module)
                .Include(l => l.Resources)
                .FirstOrDefaultAsync(l => l.Id == id);

            if (lesson == null)
            {
                return NotFound();
            }

            return lesson;
        }

        // POST: api/Lessons
        [HttpPost]
        public async Task<ActionResult<Lesson>> CreateLesson(Lesson lesson)
        {
            lesson.CreatedAt = DateTime.UtcNow;
            _context.Lessons.Add(lesson);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLesson), new { id = lesson.Id }, lesson);
        }

        // PUT: api/Lessons/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLesson(int id, Lesson lesson)
        {
            if (id != lesson.Id)
            {
                return BadRequest();
            }

            lesson.UpdatedAt = DateTime.UtcNow;
            _context.Entry(lesson).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LessonExists(id))
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

        // DELETE: api/Lessons/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLesson(int id)
        {
            var lesson = await _context.Lessons.FindAsync(id);
            if (lesson == null)
            {
                return NotFound();
            }

            _context.Lessons.Remove(lesson);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Lessons/Module/5
        [HttpGet("Module/{moduleId}")]
        public async Task<ActionResult<IEnumerable<Lesson>>> GetLessonsByModule(int moduleId)
        {
            return await _context.Lessons
                .Where(l => l.ModuleId == moduleId)
                .Include(l => l.Resources)
                .OrderBy(l => l.Order)
                .ToListAsync();
        }

        // PUT: api/Lessons/5/Reorder
        [HttpPut("{id}/Reorder")]
        public async Task<IActionResult> ReorderLesson(int id, [FromBody] int newOrder)
        {
            var lesson = await _context.Lessons.FindAsync(id);
            if (lesson == null)
            {
                return NotFound();
            }

            var lessons = await _context.Lessons
                .Where(l => l.ModuleId == lesson.ModuleId)
                .OrderBy(l => l.Order)
                .ToListAsync();

            var oldOrder = lesson.Order;
            if (newOrder < oldOrder)
            {
                foreach (var l in lessons.Where(l => l.Order >= newOrder && l.Order < oldOrder))
                {
                    l.Order++;
                }
            }
            else if (newOrder > oldOrder)
            {
                foreach (var l in lessons.Where(l => l.Order > oldOrder && l.Order <= newOrder))
                {
                    l.Order--;
                }
            }

            lesson.Order = newOrder;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Lessons/5/Resources
        [HttpGet("{id}/Resources")]
        public async Task<ActionResult<IEnumerable<LessonResource>>> GetLessonResources(int id)
        {
            return await _context.LessonResources
                .Where(r => r.LessonId == id)
                .OrderBy(r => r.Order)
                .ToListAsync();
        }

        private bool LessonExists(int id)
        {
            return _context.Lessons.Any(e => e.Id == id);
        }
    }
} 