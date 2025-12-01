using Backend.Core.Base;

namespace Backend.Games.Entities;

public class HistogramBucket : BaseEntity
{
    public GameMetric GameMetric { get; set; }
    public double RangeStart { get; set; }
    public double RangeEnd { get; set; }
    public long Count { get; set; }
}