using Backend.Core.Base;

namespace Backend.Games.Entities;

public class HistogramBucket : BaseEntity
{
    public GameMetric GameMetric { get; set; }
    public long GameMetricId { get; set; }
    public double Value { get; set; }
    public double Delta { get; set; }
    public double MinValue => Math.Round(Value - Delta, 2);
    public double MaxValue => Math.Round(Value + Delta, 2);
    public long Count { get; set; }

    public bool IsInRange(double value)
    {
        int scaledValue = (int)Math.Round(value * 100);
        int scaledMin = (int)Math.Round(MinValue * 100);
        int scaledMax = (int)Math.Round(MaxValue * 100);

        return scaledValue >= scaledMin && scaledValue < scaledMax;
    }
}