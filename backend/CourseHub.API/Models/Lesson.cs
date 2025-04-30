using System;
using System.ComponentModel.DataAnnotations;

namespace CourseHub.API.Models
{
    public class Lesson
    {
        public int Id { get; set; }
        public int ModuleId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string VideoUrl { get; set; }
        public string DocumentUrl { get; set; }
        public int Duration { get; set; }
        public int Order { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public CourseModule Module { get; set; }

        // Add this property to fix the error
        public ICollection<LessonResource> Resources { get; set; }
    }
} 