using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CourseHub.API.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public int InstructorId { get; set; }
        public int CategoryId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public User Instructor { get; set; }
        public Category Category { get; set; }
        public ICollection<Enrollment> Enrollments { get; set; }
        public ICollection<CourseModule> Modules { get; set; }
        public ICollection<Review> Reviews { get; set; } // Add this property to fix the error
    }
} 