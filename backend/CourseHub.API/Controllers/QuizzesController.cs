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
    public class QuizzesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public QuizzesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Quizzes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quiz>>> GetQuizzes()
        {
            return await _context.Quizzes
                .Include(q => q.Course)
                .Include(q => q.Questions)
                .ToListAsync();
        }

        // GET: api/Quizzes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Quiz>> GetQuiz(int id)
        {
            var quiz = await _context.Quizzes
                .Include(q => q.Course)
                .Include(q => q.Questions)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (quiz == null)
            {
                return NotFound();
            }

            return quiz;
        }

        // POST: api/Quizzes
        [HttpPost]
        public async Task<ActionResult<Quiz>> CreateQuiz(Quiz quiz)
        {
            quiz.CreatedAt = DateTime.UtcNow;
            _context.Quizzes.Add(quiz);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetQuiz), new { id = quiz.Id }, quiz);
        }

        // PUT: api/Quizzes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuiz(int id, Quiz quiz)
        {
            if (id != quiz.Id)
            {
                return BadRequest();
            }

            quiz.UpdatedAt = DateTime.UtcNow;
            _context.Entry(quiz).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuizExists(id))
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

        // DELETE: api/Quizzes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuiz(int id)
        {
            var quiz = await _context.Quizzes.FindAsync(id);
            if (quiz == null)
            {
                return NotFound();
            }

            _context.Quizzes.Remove(quiz);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Quizzes/Course/5
        [HttpGet("Course/{courseId}")]
        public async Task<ActionResult<IEnumerable<Quiz>>> GetCourseQuizzes(int courseId)
        {
            return await _context.Quizzes
                .Where(q => q.CourseId == courseId)
                .Include(q => q.Questions)
                .ToListAsync();
        }

        // POST: api/Quizzes/5/Submit
        [HttpPost("{id}/Submit")]
        public async Task<ActionResult<QuizAttempt>> SubmitQuiz(int id, [FromBody] List<Answer> answers)
        {
            var quiz = await _context.Quizzes
                .Include(q => q.Questions)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (quiz == null)
            {
                return NotFound();
            }

            var attempt = new QuizAttempt
            {
                UserId = 1, // TODO: Get from authenticated user
                QuizId = id,
                StartedAt = DateTime.UtcNow,
                Score = 0,
                IsPassed = false
            };

            _context.QuizAttempts.Add(attempt);
            await _context.SaveChangesAsync();

            foreach (var answer in answers)
            {
                answer.QuizAttemptId = attempt.Id;
                answer.CreatedAt = DateTime.UtcNow;
                _context.Answers.Add(answer);
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetQuiz), new { id = attempt.Id }, attempt);
        }

        private bool QuizExists(int id)
        {
            return _context.Quizzes.Any(e => e.Id == id);
        }
    }
} 