using Backend.Core.Base;

namespace Backend.Games.Entities;

public class HistogramBucket : BaseEntity
{
    public GameMetric GameMetric { get; set; }
    public long GameMetricId { get; set; }
    public double MinValue { get; set; }
    public double MaxValue { get; set; }
    public long Count { get; set; }
}