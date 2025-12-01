using Backend.Core.Base;

namespace Backend.Games.Entities;

public class GameMetric : BaseEntity
{
    public Game Game { get; set; }
    public string MetricName { get; set; }
    public double HistogramBucketRange { get; set; }
    public IEnumerable<HistogramBucket> HistogramBuckets { get; set; } = [];
}