using task_manager_api.DTOs;
using Microsoft.AspNetCore.Mvc;
using task_manager_api.Models;

namespace task_manager_api.Services
{
    public interface ITaskService
    {
        // Other method signatures...

        int GetCurrentUserId();
        Task<IEnumerable<TaskItem>> Get();
        Task<TaskItem> Create([FromBody] CreateTaskDto createDto);
        Task<TaskItem> Update(int id, [FromBody] UpdateTaskDto updateDto);
        Task Delete(int id);
    }
}