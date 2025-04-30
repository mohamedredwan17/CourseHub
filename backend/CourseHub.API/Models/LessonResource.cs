using System.ComponentModel.DataAnnotations;


public class LessonResource
{
    public int Id { get; set; }
    [Required]
    public int LessonId { get; set; }
    [Required]
    [StringLength(100)]
    public string Title { get; set; }
    [Required]
    public string ResourceUrl { get; set; }
    [StringLength(50)]
    public string ResourceType { get; set; }
    public int Order { get; set; } // Add this field
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public Lesson Lesson { get; set; }
}
