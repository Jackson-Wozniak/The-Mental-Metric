using Backend.Games.Objects;

namespace Backend.Api.Dtos;

public class GridRecallStatsDto
{
    public int Level { get; set; }
    
    public GridRecallStatsDto(){ }

    public GridRecallStatsDto(GridRecallStats stats)
    {
        Level = stats.Level;
    }

    public GridRecallStats Map()
    {
        return new GridRecallStats()
        {
            Level = Level
        };
    }
}