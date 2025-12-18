using Backend.Games.Objects;

namespace Backend.Api.Dtos;

public class GridRecallReportDto
{
    public int TimesPlayed { get; set; }
    public int Level { get; set; }
    public double LevelPercentile { get; set; }
    public Dictionary<int, int> UsersPerLevel { get; set; } = [];
    
    public double AccuracyRate { get; set; }
    public double AccuracyRatePercentile { get; set; }
    public Dictionary<double, int> UsersPerAccuracyRate { get; set; } = [];
    
    public int CorrectStreak { get; set; }
    public double CorrectStreakPercentile { get; set; }
    public Dictionary<int, int> UsersPerCorrectStreak { get; set; } = [];
    
    public GridRecallReportDto() { }

    public GridRecallReportDto(GridRecallReport report)
    {
        TimesPlayed = report.TimesPlayed;
        Level = report.Level;
        LevelPercentile = report.LevelPercentile;
        UsersPerLevel = report.UsersPerLevel;
        AccuracyRate = report.AccuracyRate;
        AccuracyRatePercentile = report.AccuracyRatePercentile;
        UsersPerAccuracyRate = report.UsersPerAccuracyRate;
        CorrectStreak = report.CorrectStreak;
        CorrectStreakPercentile = report.CorrectStreakPercentile;
        UsersPerCorrectStreak = report.UsersPerCorrectStreak;
    }
}