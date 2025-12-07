namespace Backend.Games.Utils;

public static class PercentileCalculator
{
    public static double Percentile(int value, Dictionary<int, int> usersPerValue)
    {
        int totalUsers = usersPerValue.Values.Sum();
        if (totalUsers is 0) return 0.00;
        int usersBelow = usersPerValue
            .Where(u => u.Key <= value)
            .Select(u => u.Value)
            .Sum();
        double percentile = ((double) usersBelow / totalUsers) * 100.0;
        return Math.Round(percentile, 2);
    }
}