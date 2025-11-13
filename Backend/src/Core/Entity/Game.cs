using Backend.Core.Base;

namespace Backend.Core.Entity;

public class Game : BaseEntity
{
    public string Name { get; set; }
    public IEnumerable<GameMetric> Metrics { get; set; } = [];
    public long TimesPlayed { get; set; }
}