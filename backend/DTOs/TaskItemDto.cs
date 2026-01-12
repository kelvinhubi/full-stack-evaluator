namespace task_manager_api.DTOs
{
    /// <summary>
    /// DTO for returning task information to clients
    /// </summary>
    public class TaskItemDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public bool IsDone { get; set; }
        public int UserId { get; set; }
    }
}
