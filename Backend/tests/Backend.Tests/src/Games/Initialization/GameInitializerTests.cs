using Backend.Data;
using Backend.Games.Constants;
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
        var games = GameConstants.GameDefinitions;
        var provider = BuildServiceProvider();
        var repository = provider.GetRequiredService<GameRepository>();
        var logger = provider.GetRequiredService<ListLogger<GameInitializer>>();
        var initializer = new GameInitializer(logger, provider);

        await initializer.StartAsync(CancellationToken.None);
        
        Assert.Equal(games.Count, repository.Count());
        foreach (var game in games)
        {
            Assert.NotNull(repository.FindByName(game.Key));
        }
        
        Assert.Equal($"New games saved on startup: {string.Join(", ", games.Keys)}", logger.Messages.Last());
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
}