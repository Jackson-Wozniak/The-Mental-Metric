using Backend.Games.Constants;
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
            Name = GridRecallConstants.Name,
            TimesPlayed = 0,
            Metrics = new List<GameMetric>()
        };
        game.Metrics.Add(LevelMetric(game));
        game.Metrics.Add(CorrectStreakMetric(game));
        game.Metrics.Add(AccuracyRateMetric(game));

        return game;
    }

    private static GameMetric LevelMetric(Game game)
    {
        var metric = new GameMetric
        {
            Game = game,
            MetricName = GridRecallConstants.LevelMetricName,
            HistogramBucketDelta = 0,
            HistogramBuckets = []
        };

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

        return metric;
    }

    private static GameMetric CorrectStreakMetric(Game game)
    {
        var metric = new GameMetric
        {
            Game = game,
            MetricName = GridRecallConstants.CorrectStreakMetricName,
            HistogramBucketDelta = 0,
            HistogramBuckets = []
        };
        return metric;
    }
    
    private static GameMetric AccuracyRateMetric(Game game)
    {
        var metric = new GameMetric
        {
            Game = game,
            MetricName = GridRecallConstants.AccuracyRateMetricName,
            HistogramBucketDelta = 0,
            HistogramBuckets = []
        };
        return metric;
    }
}