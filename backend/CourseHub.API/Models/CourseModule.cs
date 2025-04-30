using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CourseHub.API.Models
{
    public class CourseModule
    {
        public int Id { get; set; }

        [Required]
        public int CourseId { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        public int Order { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public Course Course { get; set; }
        public ICollection<Lesson> Lessons { get; set; }
    }
} 