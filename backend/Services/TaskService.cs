using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using task_manager_api.Models;
using task_manager_api.Data;
using task_manager_api.DTOs;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace task_manager_api.Services
{
    public class TaskService : ITaskService
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TaskService(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public int GetCurrentUserId()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            var userIdClaim = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.Parse(userIdClaim ?? "0");
        }

        public async Task<IEnumerable<TaskItem>> Get()
        {
            var userId = GetCurrentUserId();
            IEnumerable<TaskItem> tasks = await _context.Tasks
                .Where(t => t.UserId == userId)
                .ToListAsync();
            return tasks;
        }

        public async Task<TaskItem> Create(CreateTaskDto createDto)
        {
            var userId = GetCurrentUserId();
            var task = new TaskItem
            {
                Title = createDto.Title,
                IsDone = createDto.IsDone,
                UserId = userId
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<TaskItem> Update(int id, UpdateTaskDto updateDto)
        {
            var userId = GetCurrentUserId();
            var task = await _context.Tasks.FindAsync(id);

            if (task == null || task.UserId != userId)
            {
                throw new Exception("Task not found or access denied");
            }

            task.Title = updateDto.Title;
            task.IsDone = updateDto.IsDone;

            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task Delete(int id)
        {
            var userId = GetCurrentUserId();
            var task = await _context.Tasks.FindAsync(id);

            if (task == null || task.UserId != userId)
            {
                throw new Exception("Task not found or access denied");
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
        }
    }
}
    }