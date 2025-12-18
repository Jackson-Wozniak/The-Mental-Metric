using Backend.Games.Objects;

namespace Backend.Api.Dtos;

public class GridRecallStatsDto
{
    public int Level { get; set; }
    public int TotalGuesses { get; set; }
    public int CorrectGuesses { get; set; }
    public int MaxCorrectStreak { get; set; }
    
    public GridRecallStatsDto(){ }

    public GridRecallStats Map()
    {
        return new GridRecallStats(Level, TotalGuesses, CorrectGuesses, MaxCorrectStreak);
    }
}