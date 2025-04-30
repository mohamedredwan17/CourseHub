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
    public class CourseModulesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CourseModulesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CourseModules
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseModule>>> GetCourseModules()
        {
            return await _context.CourseModules
                .Include(m => m.Course)
                .Include(m => m.Lessons)
                .ToListAsync();
        }

        // GET: api/CourseModules/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CourseModule>> GetCourseModule(int id)
        {
            var courseModule = await _context.CourseModules
                .Include(m => m.Course)
                .Include(m => m.Lessons)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (courseModule == null)
            {
                return NotFound();
            }

            return courseModule;
        }

        // POST: api/CourseModules
        [HttpPost]
        public async Task<ActionResult<CourseModule>> CreateCourseModule(CourseModule courseModule)
        {
            courseModule.CreatedAt = DateTime.UtcNow;
            _context.CourseModules.Add(courseModule);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCourseModule), new { id = courseModule.Id }, courseModule);
        }

        // PUT: api/CourseModules/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCourseModule(int id, CourseModule courseModule)
        {
            if (id != courseModule.Id)
            {
                return BadRequest();
            }

            courseModule.UpdatedAt = DateTime.UtcNow;
            _context.Entry(courseModule).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseModuleExists(id))
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

        // DELETE: api/CourseModules/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourseModule(int id)
        {
            var courseModule = await _context.CourseModules.FindAsync(id);
            if (courseModule == null)
            {
                return NotFound();
            }

            _context.CourseModules.Remove(courseModule);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/CourseModules/Course/5
        [HttpGet("Course/{courseId}")]
        public async Task<ActionResult<IEnumerable<CourseModule>>> GetCourseModulesByCourse(int courseId)
        {
            return await _context.CourseModules
                .Where(m => m.CourseId == courseId)
                .Include(m => m.Lessons)
                .OrderBy(m => m.Order)
                .ToListAsync();
        }

        // PUT: api/CourseModules/5/Reorder
        [HttpPut("{id}/Reorder")]
        public async Task<IActionResult> ReorderModule(int id, [FromBody] int newOrder)
        {
            var module = await _context.CourseModules.FindAsync(id);
            if (module == null)
            {
                return NotFound();
            }

            var modules = await _context.CourseModules
                .Where(m => m.CourseId == module.CourseId)
                .OrderBy(m => m.Order)
                .ToListAsync();

            var oldOrder = module.Order;
            if (newOrder < oldOrder)
            {
                foreach (var m in modules.Where(m => m.Order >= newOrder && m.Order < oldOrder))
                {
                    m.Order++;
                }
            }
            else if (newOrder > oldOrder)
            {
                foreach (var m in modules.Where(m => m.Order > oldOrder && m.Order <= newOrder))
                {
                    m.Order--;
                }
            }

            module.Order = newOrder;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CourseModuleExists(int id)
        {
            return _context.CourseModules.Any(e => e.Id == id);
        }
    }
} 