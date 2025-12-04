using Backend.Core.Base;

namespace Backend.Games.Entities;

public class Game : BaseEntity
{
    public string Name { get; set; }
    public List<GameMetric> Metrics { get; set; } = [];
    public long TimesPlayed { get; set; }
}