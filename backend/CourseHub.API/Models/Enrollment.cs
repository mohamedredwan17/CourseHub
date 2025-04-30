using System;
using System.ComponentModel.DataAnnotations;

namespace CourseHub.API.Models
{
    public class Enrollment
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int CourseId { get; set; }

        public DateTime EnrolledAt { get; set; }
        public DateTime? CompletedAt { get; set; }
        public decimal? Progress { get; set; }

        // Navigation properties
        public User User { get; set; }
        public Course Course { get; set; }
    }
} 