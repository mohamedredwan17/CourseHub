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
    public class CertificatesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CertificatesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Certificates
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Certificate>>> GetCertificates()
        {
            return await _context.Certificates
                .Include(c => c.User)
                .Include(c => c.Course)
                .OrderByDescending(c => c.IssuedAt)
                .ToListAsync();
        }

        // GET: api/Certificates/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Certificate>> GetCertificate(int id)
        {
            var certificate = await _context.Certificates
                .Include(c => c.User)
                .Include(c => c.Course)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (certificate == null)
            {
                return NotFound();
            }

            return certificate;
        }

        // POST: api/Certificates
        [HttpPost]
        public async Task<ActionResult<Certificate>> CreateCertificate(Certificate certificate)
        {
            certificate.IssuedAt = DateTime.UtcNow;
            certificate.CertificateNumber = GenerateCertificateNumber();
            _context.Certificates.Add(certificate);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCertificate), new { id = certificate.Id }, certificate);
        }

        // PUT: api/Certificates/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCertificate(int id, Certificate certificate)
        {
            if (id != certificate.Id)
            {
                return BadRequest();
            }

            _context.Entry(certificate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CertificateExists(id))
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

        // DELETE: api/Certificates/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCertificate(int id)
        {
            var certificate = await _context.Certificates.FindAsync(id);
            if (certificate == null)
            {
                return NotFound();
            }

            _context.Certificates.Remove(certificate);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Certificates/User/5
        [HttpGet("User/{userId}")]
        public async Task<ActionResult<IEnumerable<Certificate>>> GetUserCertificates(int userId)
        {
            return await _context.Certificates
                .Where(c => c.UserId == userId)
                .Include(c => c.Course)
                .OrderByDescending(c => c.IssuedAt)
                .ToListAsync();
        }

        // GET: api/Certificates/Course/5
        [HttpGet("Course/{courseId}")]
        public async Task<ActionResult<IEnumerable<Certificate>>> GetCourseCertificates(int courseId)
        {
            return await _context.Certificates
                .Where(c => c.CourseId == courseId)
                .Include(c => c.User)
                .OrderByDescending(c => c.IssuedAt)
                .ToListAsync();
        }

        // GET: api/Certificates/Verify/{certificateNumber}
        [HttpGet("Verify/{certificateNumber}")]
        public async Task<ActionResult<Certificate>> VerifyCertificate(string certificateNumber)
        {
            var certificate = await _context.Certificates
                .Include(c => c.User)
                .Include(c => c.Course)
                .FirstOrDefaultAsync(c => c.CertificateNumber == certificateNumber);

            if (certificate == null)
            {
                return NotFound();
            }

            return certificate;
        }

        // GET: api/Certificates/User/5/Course/5
        [HttpGet("User/{userId}/Course/{courseId}")]
        public async Task<ActionResult<Certificate>> GetUserCourseCertificate(int userId, int courseId)
        {
            var certificate = await _context.Certificates
                .Include(c => c.User)
                .Include(c => c.Course)
                .FirstOrDefaultAsync(c => c.UserId == userId && c.CourseId == courseId);

            if (certificate == null)
            {
                return NotFound();
            }

            return certificate;
        }

        private string GenerateCertificateNumber()
        {
            var timestamp = DateTime.UtcNow.Ticks;
            var random = new Random();
            var randomNumber = random.Next(1000, 9999);
            return $"CH-{timestamp}-{randomNumber}";
        }

        private bool CertificateExists(int id)
        {
            return _context.Certificates.Any(e => e.Id == id);
        }
    }
} 