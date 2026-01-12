using System.ComponentModel.DataAnnotations;

namespace task_manager_api.DTOs
{
    /// <summary>
    /// DTO for creating a new task
    /// </summary>
    public class CreateTaskDto
    {
        [Required(ErrorMessage = "Title is required")]
        [MaxLength(200, ErrorMessage = "Title cannot exceed 200 characters")]
        public string Title { get; set; } = string.Empty;

        public bool IsDone { get; set; } = false;
    }
}
