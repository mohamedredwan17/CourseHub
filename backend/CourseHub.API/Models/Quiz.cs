using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CourseHub.API.Models
{
    public class Quiz
    {
        public int Id { get; set; }

        [Required]
        public int CourseId { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        public int TimeLimit { get; set; } // in minutes
        public int PassingScore { get; set; } // percentage
        public int MaxAttempts { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public Course Course { get; set; }
        public ICollection<Question> Questions { get; set; }
        public ICollection<QuizAttempt> Attempts { get; set; }
    }
} 