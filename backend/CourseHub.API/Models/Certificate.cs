using System;
using System.ComponentModel.DataAnnotations;

namespace CourseHub.API.Models
{
    public class Certificate
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int CourseId { get; set; }

        [Required]
        [StringLength(50)]
        public string CertificateNumber { get; set; }

        public DateTime IssueDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string DownloadUrl { get; set; }
        public string VerificationCode { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public User User { get; set; }
        public Course Course { get; set; }
    }
} 