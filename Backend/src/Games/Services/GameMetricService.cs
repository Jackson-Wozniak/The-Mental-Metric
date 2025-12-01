using Backend.Games.Entities;

namespace Backend.Games.Services;

public class GameMetricService
{
    public double InsertHistogramEntry(string gameName, string metricName, double value)
    {
        //pull the histogram buckets for the game
        //find the bucket the value fits into
            //if no bucket exists, use the metric's value range to insert new buckets
        //increment bucket count
        //return percentile of value
        return 0.0;
    }
}