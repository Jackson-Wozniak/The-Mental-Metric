using Backend.Games.Entities;
using Backend.Games.Services;

namespace Backend.Tests.Games.Services;

public class GameMetricServiceTests
{
    [Fact]
    public void AddMissingBuckets_ZeroBuckets_FillsAll()
    {
        var service = new GameMetricService(null);
        
        var metric = new GameMetric()
        {
            Game = new Game(),
            GameId = -1,
            MetricName = "Test",
            HistogramBucketDelta = 0,
            HistogramBuckets = [],
        };

        //should fill up 0,1,2...10 with count 0 (and 1 for the 10 bucket)
        var bucket = service.AddMissingBuckets(metric, 10);

        var buckets = metric.HistogramBuckets.OrderBy(b => b.Value).ToList();

        Assert.Equal(11, buckets.Count);
        for (int i = 0; i <= 10; i++)
        {
            Assert.Equal(i, buckets[i].Value);
            Assert.Equal(i == 10 ? 1 : 0, buckets[i].Count);
        }
    }

    [Fact]
    public void AddMissingBuckets_MissingRange_FillsAll()
    {
        var service = new GameMetricService(null);
        
        var metric = new GameMetric()
        {
            Game = new Game(),
            GameId = -1,
            MetricName = "Test",
            HistogramBucketDelta = 0,
            HistogramBuckets = [],
        };
        metric.HistogramBuckets.Add(new HistogramBucket()
        {
            GameMetric = metric,
            GameMetricId = -1,
            Value = 0,
            Delta = 0,
            Count = 0,
        });
        metric.HistogramBuckets.Add(new HistogramBucket()
        {
            GameMetric = metric,
            GameMetricId = -1,
            Value = 1,
            Delta = 0,
            Count = 0,
        });
        metric.HistogramBuckets.Add(new HistogramBucket()
        {
            GameMetric = metric,
            GameMetricId = -1,
            Value = 2,
            Delta = 0,
            Count = 0,
        });

        //should fill up 3,4,5...10 with count 0 (and 1 for the 10 bucket)
        var bucket = service.AddMissingBuckets(metric, 10);

        var buckets = metric.HistogramBuckets.OrderBy(b => b.Value).ToList();

        Assert.Equal(11, buckets.Count);
        for (int i = 0; i <= 10; i++)
        {
            Assert.Equal(i, buckets[i].Value);
            Assert.Equal(i == 10 ? 1 : 0, buckets[i].Count);
        }
    }
}