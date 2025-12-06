using Backend.Games.Definitions;
using Backend.Games.Entities;
using Backend.Games.Repositories;

namespace Backend.Games.Initialization;

public class GameInitializer(IServiceProvider serviceProvider) : BackgroundService
{
    private static readonly Dictionary<string, Game> Games = new()
    {
        {"Grid Recall", GridRecallDefinition.Get()}
    };
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        if (!stoppingToken.IsCancellationRequested)
        {
            using var scope = serviceProvider.CreateScope();
            var gameRepository = scope.ServiceProvider.GetRequiredService<GameRepository>();

            foreach (KeyValuePair<string, Game> game in Games)
            {
                if (gameRepository.FindByName(game.Key) is null)
                {
                    await gameRepository.SaveAsync(game.Value);
                }
            }
        }
    }
}