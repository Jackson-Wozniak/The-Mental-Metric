using Backend.Core.Base;

namespace Backend.Games.Entities;

public class HistogramBucket : BaseEntity
{
    public GameMetric GameMetric { get; set; }
    public long GameMetricId { get; set; }
    public double Value { get; set; }
    public double Delta { get; set; }
    public double MinValue => Value - Delta;
    public double MaxValue => Value + Delta;
    public long Count { get; set; }
}