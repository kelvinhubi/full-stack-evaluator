using Microsoft.EntityFrameworkCore;
using task_manager_api.Data;
using DotNetEnv;


var builder = WebApplication.CreateBuilder(args);

Env.Load();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable serving static files from wwwroot
app.UseStaticFiles();

// Enable default files (index.html)
app.UseDefaultFiles();

app.MapControllers();

// Fallback route for SPA - serves index.html for any unmatched routes
app.MapFallbackToFile("index.html");

app.Run();
