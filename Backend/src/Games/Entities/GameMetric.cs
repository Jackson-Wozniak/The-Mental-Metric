using Backend.Core.Base;

namespace Backend.Games.Entities;

public class GameMetric : BaseEntity
{
    public Game Game { get; set; }
    public long GameId { get; set; }
    public string MetricName { get; set; }
    public double HistogramBucketInterval { get; set; }
    public List<HistogramBucket> HistogramBuckets { get; set; } = [];
}