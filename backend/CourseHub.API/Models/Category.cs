using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CourseHub.API.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public ICollection<Course> Courses { get; set; }
    }
} 