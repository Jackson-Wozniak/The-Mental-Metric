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
        
        var metric = new GameMetric
        {
            Game = game,
            MetricName = "Level",
            HistogramBucketDelta = 0,
            HistogramBuckets = new List<HistogramBucket>()
        };
        game.Metrics.Add(metric);

        for (int i = 1; i < 30; i++)
        {
            metric.HistogramBuckets.Add(new HistogramBucket
            {
                Count = 0,
                GameMetric = metric,
                Value = i,
                Delta = metric.HistogramBucketDelta
            });
        }

        return game;
    }
}