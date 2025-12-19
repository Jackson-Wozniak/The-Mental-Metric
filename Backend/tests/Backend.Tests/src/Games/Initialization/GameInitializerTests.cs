using Backend.Data;
using Backend.Games.Constants;
using Backend.Games.Definitions;
using Backend.Games.Initialization;
using Backend.Games.Repositories;
using Backend.Tests.Mocks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Backend.Tests.Games.Initialization;

public class GameInitializerTests
{
    private IServiceProvider BuildServiceProvider()
    {
        var services = new ServiceCollection();

        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseInMemoryDatabase(Guid.NewGuid().ToString()));

        services.AddSingleton<GameRepository>();

        var logger = new ListLogger<GameInitializer>();
        services.AddSingleton<ListLogger<GameInitializer>>(logger);

        return services.BuildServiceProvider();
    }

    [Fact]
    public async Task ExecuteAsync_EmptyDatabase_AddsAllGames()
    {
        var names = GameConstants.GameNames;
        var provider = BuildServiceProvider();
        var repository = provider.GetRequiredService<GameRepository>();
        var logger = provider.GetRequiredService<ListLogger<GameInitializer>>();
        var initializer = new GameInitializer(logger, provider);

        await initializer.StartAsync(CancellationToken.None);
        
        Assert.Equal(names.Count, repository.Count());
        foreach (var name in names)
        {
            Assert.NotNull(repository.FindByName(name));
        }
        
        Assert.Equal($"New games saved on startup: {string.Join(", ", names)}", logger.Messages.Last());
    }

    [Fact]
    public async Task ExecuteAsync_MultipleRuns_PrintsEmptyLog()
    {
        var provider = BuildServiceProvider();
        var logger = provider.GetRequiredService<ListLogger<GameInitializer>>();
        var initializer = new GameInitializer(logger, provider);

        await initializer.StartAsync(CancellationToken.None);
        
        await initializer.StartAsync(CancellationToken.None);
        
        Assert.Equal("All games previously saved on startup", logger.Messages.Last());
    }
    
    [Fact]
    public async Task ExecuteAsync_MissingMetrics_UpdatesGames()
    {
        var provider = BuildServiceProvider();
        var repository = provider.GetRequiredService<GameRepository>();
        var logger = provider.GetRequiredService<ListLogger<GameInitializer>>();
        var initializer = new GameInitializer(logger, provider);

        await initializer.StartAsync(CancellationToken.None);
        
        var gridRecall = repository.FindByName(GridRecallConstants.Name);
        Assert.NotNull(gridRecall);
        gridRecall.Metrics = [];
        repository.Update(gridRecall);
        
        await initializer.StartAsync(CancellationToken.None);
        
        Assert.Equal($"New games saved on startup: {GridRecallConstants.Name}", logger.Messages.Last());
        
        gridRecall = repository.FindByName(GridRecallConstants.Name);
        Assert.NotNull(gridRecall);

        var existingMetricNames = gridRecall.Metrics
            .Select(m => m.MetricName)
            .ToHashSet();
        
        var missingMetrics = GridRecallDefinition.Get().Metrics
            .Where(m => !existingMetricNames.Contains(m.MetricName))
            .ToList();
        
        Assert.Empty(missingMetrics);
    }
}