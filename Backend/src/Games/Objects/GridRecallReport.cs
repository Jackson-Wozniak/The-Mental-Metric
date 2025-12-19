namespace Backend.Games.Objects;

public class GridRecallReport
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
    
    protected GridRecallReport() { }

    public GridRecallReport(int timesPlayed, int level, 
        double percentile, Dictionary<int, int> usersPerLevel)
    {
        TimesPlayed = timesPlayed;
        Level = level;
        LevelPercentile = percentile;
        UsersPerLevel = usersPerLevel;
    }

    public class Builder
    {
        private readonly GridRecallReport _report = new GridRecallReport();

        public Builder(int timesPlayed)
        {
            _report.TimesPlayed = timesPlayed;
        }

        public Builder LevelStats(int value, double percentile, Dictionary<int, int> histogram)
        {
            _report.Level = value;
            _report.LevelPercentile = percentile;
            _report.UsersPerLevel = histogram;
            return this;
        }

        public Builder CorrectStreakStats(int value, double percentile, Dictionary<int, int> histogram)
        {
            _report.CorrectStreak = value;
            _report.CorrectStreakPercentile = percentile;
            _report.UsersPerCorrectStreak = histogram;
            return this;
        }

        public Builder AccuracyRateStats(double value, double percentile, Dictionary<double, int> histogram)
        {
            _report.AccuracyRate = value;
            _report.AccuracyRatePercentile = percentile;
            _report.UsersPerAccuracyRate = histogram;
            return this;
        }

        public GridRecallReport Build()
        {
            return _report;
        }
    }
}