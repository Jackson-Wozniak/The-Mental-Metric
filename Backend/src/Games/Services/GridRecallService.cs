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
        var correctStreakMetric = gameMetricService.InsertHistogramEntry(
            GridRecallConstants.Name, GridRecallConstants.CorrectStreakMetricName,
            stats.CorrectStreak);
        var accuracyRateMetric = gameMetricService.InsertHistogramEntry(
            GridRecallConstants.Name, GridRecallConstants.AccuracyRateMetricName,
            Math.Round(stats.AccuracyRate));

        var usersPerLevel = levelMetric.HistogramBuckets
            .ToDictionary(b => (int)b.Value, b => (int)b.Count);
        var timesPlayed = usersPerLevel.Values.Sum();
        var levelPercentile = PercentileCalculator.Percentile(stats.Level, usersPerLevel);

        var usersPerAccuracyRate = accuracyRateMetric.HistogramBuckets
            .ToDictionary(b => b.Value, b => (int)b.Count);
        var accuracyPercentile = PercentileCalculator.Percentile(stats.AccuracyRate, usersPerAccuracyRate);

        var usersPerStreak = correctStreakMetric.HistogramBuckets
            .ToDictionary(b => (int)b.Value, b => (int)b.Count);
        var streakPercentile = PercentileCalculator.Percentile(stats.CorrectStreak, usersPerStreak);
        
        return new GridRecallReport(timesPlayed, stats.Level, levelPercentile, usersPerLevel)
        {
            AccuracyRate = stats.AccuracyRate,
            AccuracyRatePercentile = accuracyPercentile,
            UsersPerAccuracyRate = usersPerAccuracyRate,
            CorrectStreak = stats.CorrectStreak,
            CorrectStreakPercentile = streakPercentile,
            UsersPerCorrectStreak = usersPerStreak
        };
    }
}