using Backend.Games.Objects;

namespace Backend.Api.Dtos;

public class GridRecallReportDto
{
    public int TimesPlayed { get; set; }
    public int Level { get; set; }
    public double LevelPercentile { get; set; }
    public Dictionary<int, int> UsersPerLevel { get; set; } = [];
    
    public GridRecallReportDto() { }

    public GridRecallReportDto(GridRecallReport report)
    {
        TimesPlayed = report.TimesPlayed;
        Level = report.Level;
        LevelPercentile = report.LevelPercentile;
        UsersPerLevel = report.UsersPerLevel;
    }
}