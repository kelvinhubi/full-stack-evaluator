namespace task_manager_api.DTOs
{
    /// <summary>
    /// DTO for returning authentication response with JWT token
    /// </summary>
    public class AuthResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public UserDto User { get; set; } = null!;
    }
}
