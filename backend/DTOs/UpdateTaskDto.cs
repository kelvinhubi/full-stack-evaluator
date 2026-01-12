using System.ComponentModel.DataAnnotations;

namespace task_manager_api.DTOs
{
    /// <summary>
    /// DTO for updating an existing task
    /// </summary>
    public class UpdateTaskDto
    {
        [Required(ErrorMessage = "Title is required")]
        [MaxLength(200, ErrorMessage = "Title cannot exceed 200 characters")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "IsDone status is required")]
        public bool IsDone { get; set; }
    }
}
