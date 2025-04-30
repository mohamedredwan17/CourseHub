using System;
using System.ComponentModel.DataAnnotations;

namespace CourseHub.API.Models
{
    public class Notification
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        [StringLength(500)]
        public string Message { get; set; }

        [Required]
        [StringLength(20)]
        public string Type { get; set; } // Info, Success, Warning, Error

        public bool IsRead { get; set; }
        public string Link { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ReadAt { get; set; }

        // Navigation properties
        public User User { get; set; }
    }
} 