using Backend.Data;
using Backend.Core.Exceptions;
using Backend.Games.Entities;
using Backend.Games.Initialization;
using Backend.Games.Repositories;
using Backend.Games.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddLogging(logging => logging.AddConsole().AddDebug());

var connectionString = builder.Configuration.GetConnectionString("ApplicationDbConnectionString");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

builder.Services.AddScoped<GameRepository>();
builder.Services.AddScoped<GameMetricService>();
builder.Services.AddScoped<GridRecallService>();
builder.Services.AddHostedService<GameInitializer>();

builder.Services.AddControllers(options =>
{
    options.Filters.Add<ApplicationExceptionFilter>();
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

var app = builder.Build();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();