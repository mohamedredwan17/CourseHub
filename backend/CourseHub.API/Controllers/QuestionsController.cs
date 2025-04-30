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
    public class QuestionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public QuestionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Questions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
        {
            return await _context.Questions
                .Include(q => q.User)
                .Include(q => q.Course)
                .Include(q => q.Answers)
                    .ThenInclude(a => a.User)
                .OrderByDescending(q => q.CreatedAt)
                .ToListAsync();
        }

        // GET: api/Questions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Question>> GetQuestion(int id)
        {
            var question = await _context.Questions
                .Include(q => q.User)
                .Include(q => q.Course)
                .Include(q => q.Answers)
                    .ThenInclude(a => a.User)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (question == null)
            {
                return NotFound();
            }

            return question;
        }

        // POST: api/Questions
        [HttpPost]
        public async Task<ActionResult<Question>> CreateQuestion(Question question)
        {
            question.CreatedAt = DateTime.UtcNow;
            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetQuestion), new { id = question.Id }, question);
        }

        // PUT: api/Questions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuestion(int id, Question question)
        {
            if (id != question.Id)
            {
                return BadRequest();
            }

            question.UpdatedAt = DateTime.UtcNow;
            _context.Entry(question).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
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

        // DELETE: api/Questions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Questions/Course/5
        [HttpGet("Course/{courseId}")]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestionsByCourse(int courseId)
        {
            return await _context.Questions
                .Where(q => q.CourseId == courseId)
                .Include(q => q.User)
                .Include(q => q.Answers)
                    .ThenInclude(a => a.User)
                .OrderByDescending(q => q.CreatedAt)
                .ToListAsync();
        }

        // GET: api/Questions/User/5
        [HttpGet("User/{userId}")]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestionsByUser(int userId)
        {
            return await _context.Questions
                .Where(q => q.UserId == userId)
                .Include(q => q.Course)
                .Include(q => q.Answers)
                    .ThenInclude(a => a.User)
                .OrderByDescending(q => q.CreatedAt)
                .ToListAsync();
        }

        // GET: api/Questions/Unanswered
        [HttpGet("Unanswered")]
        public async Task<ActionResult<IEnumerable<Question>>> GetUnansweredQuestions()
        {
            return await _context.Questions
                .Where(q => !q.Answers.Any())
                .Include(q => q.User)
                .Include(q => q.Course)
                .OrderByDescending(q => q.CreatedAt)
                .ToListAsync();
        }

        // POST: api/Questions/5/Answers
        [HttpPost("{id}/Answers")]
        public async Task<ActionResult<Answer>> CreateAnswer(int id, Answer answer)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            answer.QuestionId = id;
            answer.CreatedAt = DateTime.UtcNow;
            _context.Answers.Add(answer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAnswer), new { id = answer.Id }, answer);
        }

        // GET: api/Questions/5/Answers
        [HttpGet("{id}/Answers")]
        public async Task<ActionResult<IEnumerable<Answer>>> GetAnswers(int id)
        {
            return await _context.Answers
                .Where(a => a.QuestionId == id)
                .Include(a => a.User)
                .OrderByDescending(a => a.CreatedAt)
                .ToListAsync();
        }

        // GET: api/Questions/Answers/5
        [HttpGet("Answers/{id}")]
        public async Task<ActionResult<Answer>> GetAnswer(int id)
        {
            var answer = await _context.Answers
                .Include(a => a.User)
                .Include(a => a.Question)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (answer == null)
            {
                return NotFound();
            }

            return answer;
        }

        // PUT: api/Questions/Answers/5
        [HttpPut("Answers/{id}")]
        public async Task<IActionResult> UpdateAnswer(int id, Answer answer)
        {
            if (id != answer.Id)
            {
                return BadRequest();
            }

            answer.UpdatedAt = DateTime.UtcNow;
            _context.Entry(answer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnswerExists(id))
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

        // DELETE: api/Questions/Answers/5
        [HttpDelete("Answers/{id}")]
        public async Task<IActionResult> DeleteAnswer(int id)
        {
            var answer = await _context.Answers.FindAsync(id);
            if (answer == null)
            {
                return NotFound();
            }

            _context.Answers.Remove(answer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuestionExists(int id)
        {
            return _context.Questions.Any(e => e.Id == id);
        }

        private bool AnswerExists(int id)
        {
            return _context.Answers.Any(e => e.Id == id);
        }
    }
} 