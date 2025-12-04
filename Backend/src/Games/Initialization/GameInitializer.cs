using Backend.Games.Definitions;
using Backend.Games.Repositories;

namespace Backend.Games.Initialization;

public class GameInitializer(IServiceProvider serviceProvider) : BackgroundService
{
    //retrieve definitions for each game
    //save game, metrics etc.
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        if (!stoppingToken.IsCancellationRequested)
        {
            using var scope = serviceProvider.CreateScope();
            var gameRepository = scope.ServiceProvider.GetRequiredService<GameRepository>();
            
            //await gameRepository.SaveAsync(GridRecallDefinition.Get());
        }
    }
}