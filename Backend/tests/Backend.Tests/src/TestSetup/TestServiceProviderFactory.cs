using Backend.Data;
using Backend.Games.Initialization;
using Backend.Games.Repositories;
using Backend.Games.Services;
using Backend.Tests.Mocks;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Backend.Tests.TestSetup;

public static class TestServiceProviderFactory
{
    public static IServiceProvider Create(bool runInitializer = false)
    {
        var services = new ServiceCollection();

        services.AddSingleton<ListLogger<GameInitializer>>();
        
        var connection = new SqliteConnection("DataSource=:memory:");
        connection.Open();
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlite(connection));

        services.AddScoped<GameRepository>();
        services.AddScoped<GridRecallService>();
        services.AddScoped<GameMetricService>();

        if (runInitializer)
        {
            services.AddHostedService<GameInitializer>();
        }

        var provider = services.BuildServiceProvider();

        using var scope = provider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        context.Database.EnsureCreated();

        return provider;
    }
}