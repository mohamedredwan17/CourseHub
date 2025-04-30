using System;
using System.ComponentModel.DataAnnotations;

namespace CourseHub.API.Models
{
    public class Payment
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int CourseId { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        [StringLength(50)]
        public string PaymentMethod { get; set; }

        [Required]
        [StringLength(100)]
        public string TransactionId { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; } // Pending, Completed, Failed, Refunded

        public string PaymentDetails { get; set; } // JSON string of payment details
        public DateTime CreatedAt { get; set; }
        public DateTime? CompletedAt { get; set; }

        // Navigation properties
        public User User { get; set; }
        public Course Course { get; set; }
    }
} 