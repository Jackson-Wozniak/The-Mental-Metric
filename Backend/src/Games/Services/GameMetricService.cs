using Backend.Core.Exceptions;
using Backend.Games.Entities;
using Backend.Games.Repositories;

namespace Backend.Games.Services;

public class GameMetricService(GameRepository gameRepository)
{
    public GameMetric InsertHistogramEntry(string gameName, string metricName, double value)
    {
        //pull the histogram buckets for the game
        //find the bucket the value fits into
            //if no bucket exists, use the metric's value range to insert new buckets
        //increment bucket count
        //return percentile of value
        Game? game = gameRepository.FindByName(gameName);
        if (game is null) throw new NotFoundException("No game can be found");

        GameMetric? metric = game.Metrics
            .SingleOrDefault(m => m.MetricName.Equals(metricName));
        if (metric is null) throw new NotFoundException("No metric can be found");

        HistogramBucket? bucket = metric.HistogramBuckets
            .SingleOrDefault(b => b.MinValue < value && b.MaxValue > value);

        if (bucket is null)
        {
            //create a bucket for each metric interval value until you reach the value to be inserted
            bucket = new HistogramBucket
            {
                GameMetric = metric,
                Count = 1,
                MinValue = value - 1,
                MaxValue = value + 1
            };
            metric.HistogramBuckets.Add(bucket);
        }
        else
        {
            bucket.Count += 1;
        }
        
        gameRepository.Update(game);

        return metric;
    }
}