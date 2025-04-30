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
    public class ReviewsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReviewsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Reviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviews()
        {
            return await _context.Reviews
                .Include(r => r.User)
                .Include(r => r.Course)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }

        // GET: api/Reviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetReview(int id)
        {
            var review = await _context.Reviews
                .Include(r => r.User)
                .Include(r => r.Course)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (review == null)
            {
                return NotFound();
            }

            return review;
        }

        // POST: api/Reviews
        [HttpPost]
        public async Task<ActionResult<Review>> CreateReview(Review review)
        {
            review.CreatedAt = DateTime.UtcNow;
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            // تحديث متوسط تقييم الدورة
            await UpdateCourseRating(review.CourseId);

            return CreatedAtAction(nameof(GetReview), new { id = review.Id }, review);
        }

        // PUT: api/Reviews/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReview(int id, Review review)
        {
            if (id != review.Id)
            {
                return BadRequest();
            }

            review.UpdatedAt = DateTime.UtcNow;
            _context.Entry(review).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                // تحديث متوسط تقييم الدورة
                await UpdateCourseRating(review.CourseId);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReviewExists(id))
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

        // DELETE: api/Reviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }

            var courseId = review.CourseId;
            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            // تحديث متوسط تقييم الدورة
            await UpdateCourseRating(courseId);

            return NoContent();
        }

        // GET: api/Reviews/Course/5
        [HttpGet("Course/{courseId}")]
        public async Task<ActionResult<IEnumerable<Review>>> GetCourseReviews(int courseId)
        {
            return await _context.Reviews
                .Where(r => r.CourseId == courseId)
                .Include(r => r.User)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }

        // GET: api/Reviews/User/5
        [HttpGet("User/{userId}")]
        public async Task<ActionResult<IEnumerable<Review>>> GetUserReviews(int userId)
        {
            return await _context.Reviews
                .Where(r => r.UserId == userId)
                .Include(r => r.Course)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }

        // GET: api/Reviews/Course/5/Stats
        [HttpGet("Course/{courseId}/Stats")]
        public async Task<ActionResult<ReviewStats>> GetCourseReviewStats(int courseId)
        {
            var reviews = await _context.Reviews
                .Where(r => r.CourseId == courseId)
                .ToListAsync();

            var totalReviews = reviews.Count;
            if (totalReviews == 0)
            {
                return new ReviewStats
                {
                    AverageRating = 0,
                    TotalReviews = 0,
                    RatingDistribution = new Dictionary<int, int>
                    {
                        { 1, 0 },
                        { 2, 0 },
                        { 3, 0 },
                        { 4, 0 },
                        { 5, 0 }
                    }
                };
            }

            var averageRating = reviews.Average(r => r.Rating);
            var ratingDistribution = new Dictionary<int, int>
            {
                { 1, reviews.Count(r => r.Rating == 1) },
                { 2, reviews.Count(r => r.Rating == 2) },
                { 3, reviews.Count(r => r.Rating == 3) },
                { 4, reviews.Count(r => r.Rating == 4) },
                { 5, reviews.Count(r => r.Rating == 5) }
            };

            return new ReviewStats
            {
                AverageRating = Math.Round(averageRating, 1),
                TotalReviews = totalReviews,
                RatingDistribution = ratingDistribution
            };
        }

        private async Task UpdateCourseRating(int courseId)
        {
            var course = await _context.Courses.FindAsync(courseId);
            if (course == null)
            {
                return;
            }

            var reviews = await _context.Reviews
                .Where(r => r.CourseId == courseId)
                .ToListAsync();

            if (reviews.Any())
            {
                course.AverageRating = Math.Round(reviews.Average(r => r.Rating), 1);
                course.TotalReviews = reviews.Count;
            }
            else
            {
                course.AverageRating = 0;
                course.TotalReviews = 0;
            }

            await _context.SaveChangesAsync();
        }

        private bool ReviewExists(int id)
        {
            return _context.Reviews.Any(e => e.Id == id);
        }
    }

    public class ReviewStats
    {
        public double AverageRating { get; set; }
        public int TotalReviews { get; set; }
        public Dictionary<int, int> RatingDistribution { get; set; }
    }
} 