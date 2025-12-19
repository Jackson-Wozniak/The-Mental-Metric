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

            var dbGames = await gameRepository.GetAllUntrackedAsync();
            var dbGamesByName = dbGames.ToDictionary(g => g.Name);
            
            foreach (var name in GameNames)
            {
                if (!dbGamesByName.TryGetValue(name, out var dbGame))
                {
                    newlySavedGames.Add(name);
                    await gameRepository.SaveAsync(GetGameDefinition(name));
                    continue;
                }
                
                var existingMetricNames = dbGame.Metrics
                    .Select(m => m.MetricName)
                    .ToHashSet();

                var newMetrics = GetGameDefinition(name).Metrics
                    .Where(m => !existingMetricNames.Contains(m.MetricName))
                    .ToList();
                
                if (newMetrics.Count > 0)
                {
                    var trackedGame = gameRepository.FindByName(name);
                    if(trackedGame is null) continue;
                    newlySavedGames.Add(name);
                    trackedGame.Metrics.AddRange(newMetrics);
                    gameRepository.Update(trackedGame);
                }
            }

            var logMessage = newlySavedGames.Any()
                ? $"New games saved on startup: {string.Join(", ", newlySavedGames)}"
                : "All games previously saved on startup";
            logger.LogInformation(logMessage);
        }
    }
}