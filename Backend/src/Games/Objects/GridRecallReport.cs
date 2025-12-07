namespace Backend.Games.Objects;

public class GridRecallReport
{
    public int TimesPlayed { get; set; }
    public int Level { get; set; }
    public double LevelPercentile { get; set; }
    public Dictionary<int, int> UsersPerLevel { get; set; } = [];
    
    protected GridRecallReport() { }

    public GridRecallReport(int timesPlayed, int level, 
        double percentile, Dictionary<int, int> usersPerLevel)
    {
        TimesPlayed = timesPlayed;
        Level = level;
        LevelPercentile = percentile;
        UsersPerLevel = usersPerLevel;
    }
}