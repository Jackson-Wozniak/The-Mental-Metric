using Backend.Games.Entities;

namespace Backend.Games.Definitions;

public class GridRecallDefinition
{
    //returns the initial game metrics, name etc.
    //this enforces game-specific attributes during initialization
    public static Game Get()
    {
        var game = new Game
        {
            Name = "Grid Recall",
            TimesPlayed = 0,
            Metrics = new List<GameMetric>()
        };
        
        game.Metrics.Add(new GameMetric
        {
            Game = game,
            MetricName = "Level",
            HistogramBucketInterval = 1,
            HistogramBuckets = new List<HistogramBucket>()
        });

        return game;
    }
}