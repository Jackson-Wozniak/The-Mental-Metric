using Backend.Core.Exceptions;
using Backend.Games.Entities;
using Backend.Games.Repositories;

namespace Backend.Games.Services;

public class GameMetricService(GameRepository gameRepository)
{
    public GameMetric InsertHistogramEntry(string gameName, string metricName, double value)
    {
        Game? game = gameRepository.FindByName(gameName);
        if (game is null) throw new NotFoundException("No game can be found");

        GameMetric? metric = game.Metrics
            .SingleOrDefault(m => m.MetricName.Equals(metricName));
        if (metric is null) throw new NotFoundException("No metric can be found");
        
        HistogramBucket? bucket = metric.HistogramBuckets
            .SingleOrDefault(b => b.IsInRange(value));

        if (bucket is null)
        {
            //TODO: create bucket for each metric range until you reach value
            bucket = AddMissingBuckets(metric, value);
        }
        else
        {
            bucket.Count += 1;
        }
        
        gameRepository.Update(game);

        return metric;
    }
    
    public HistogramBucket AddMissingBuckets(GameMetric metric, double value)
    {
        double delta = metric.HistogramBucketDelta;
        double step = delta == 0 ? 1 : delta;

        double startValue = metric.HistogramBuckets.Count > 0
            ? metric.HistogramBuckets.Max(b => b.Value) + step
            : 0;

        HistogramBucket? finalBucket = null;

        for (double current = startValue; current <= value; current += step)
        {
            var bucket = new HistogramBucket
            {
                GameMetric = metric,
                Value = current,
                Delta = delta,
                Count = current.Equals(value) ? 1 : 0
            };

            metric.HistogramBuckets.Add(bucket);

            if (current.Equals(value))
            {
                finalBucket = bucket;
                break;
            }
        }

        return finalBucket!;
    }
}