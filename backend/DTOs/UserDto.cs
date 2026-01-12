namespace task_manager_api.DTOs
{
    /// <summary>
    /// DTO for returning user information to clients
    /// </summary>
    public class UserDto
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
    }
}
