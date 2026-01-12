using Microsoft.EntityFrameworkCore;
using task_manager_api.Data;
using DotNetEnv;


var builder = WebApplication.CreateBuilder(args);

Env.Load();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000", "https://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Seed database with default user
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    context.Database.EnsureCreated();

    // Add default user if not exists
    if (!context.Users.Any())
    {
        context.Users.Add(new task_manager_api.Models.User
        {
            Email = "default@example.com",
            PasswordHash = "default" // In production, use proper hashing
        });
        context.SaveChanges();
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use CORS policy
app.UseCors("AllowFrontend");

// Enable serving static files from wwwroot
app.UseStaticFiles();

// Enable default files (index.html)
app.UseDefaultFiles();

app.MapControllers();

// Fallback route for SPA - serves index.html for any unmatched routes
app.MapFallbackToFile("index.html");

app.Run();
