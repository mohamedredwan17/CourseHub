using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CourseHub.API.Models
{
    public class QuizAttempt
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int QuizId { get; set; }

        public DateTime StartedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
        public int Score { get; set; }
        public bool IsPassed { get; set; }
        public int AttemptNumber { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public User User { get; set; }
        public Quiz Quiz { get; set; }
        public ICollection<Answer> Answers { get; set; }
    }
} 