using Backend.Games.Entities;
using Backend.Games.Repositories;
using static Backend.Games.Constants.GameConstants;

namespace Backend.Games.Initialization;

public class GameInitializer(
    ILogger<GameInitializer> logger,
    IServiceProvider serviceProvider) : BackgroundService
{
    protected override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        return InitializeAsync(stoppingToken);
    }

    private async Task InitializeAsync(CancellationToken stoppingToken)
    {
        if (!stoppingToken.IsCancellationRequested)
        {
            List<string> newlySavedGames = [];
            
            using var scope = serviceProvider.CreateScope();
            var gameRepository = scope.ServiceProvider.GetRequiredService<GameRepository>();

            foreach (KeyValuePair<string, Game> game in GameDefinitions)
            {
                if (gameRepository.FindByName(game.Key) is not null) continue;
                newlySavedGames.Add(game.Key);
                await gameRepository.SaveAsync(game.Value);
            }

            var logMessage = newlySavedGames.Any()
                ? $"New games saved on startup: {string.Join(", ", newlySavedGames)}"
                : "All games previously saved on startup";
            logger.LogInformation(logMessage);
        }
    }
}