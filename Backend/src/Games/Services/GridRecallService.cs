using Backend.Games.Constants;
using Backend.Games.Objects;
using Backend.Games.Utils;

namespace Backend.Games.Services;

public class GridRecallService(GameMetricService gameMetricService)
{
    public GridRecallReport CreateReport(GridRecallStats stats)
    {
        //TODO: error handling (would throw internal server error)
        var levelMetric = gameMetricService.InsertHistogramEntry(
            GridRecallConstants.Name, 
            GridRecallConstants.LevelMetricName, 
            stats.Level);

        var usersPerLevel = levelMetric.HistogramBuckets
            .ToDictionary(b => (int)b.Value, b => (int)b.Count);
        var timesPlayed = usersPerLevel.Values.Sum();
        var levelPercentile = PercentileCalculator.Percentile(stats.Level, usersPerLevel);

        return new GridRecallReport(timesPlayed, stats.Level, levelPercentile, usersPerLevel);
    }
}