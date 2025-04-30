using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CourseHub.API.Models
{
    public class Question
    {
        public int Id { get; set; }

        [Required]
        public int QuizId { get; set; }

        [Required]
        [StringLength(500)]
        public string Text { get; set; }

        [Required]
        public string CorrectAnswer { get; set; }

        [Required]
        public string Options { get; set; } // JSON string of options

        public int Points { get; set; }
        public int Order { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public Quiz Quiz { get; set; }
        public ICollection<Answer> Answers { get; set; }
    }
} 