using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CourseHub.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Role { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public ICollection<Course> CreatedCourses { get; set; }
        public ICollection<Enrollment> Enrollments { get; set; }

        // Add the missing Reviews property to fix the error
        public ICollection<Review> Reviews { get; set; }
    }
} 