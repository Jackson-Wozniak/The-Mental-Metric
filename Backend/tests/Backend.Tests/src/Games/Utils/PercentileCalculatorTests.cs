using Backend.Games.Utils;

namespace Backend.Tests.Games.Utils;

public class PercentileCalculatorTests
{
    [Fact]
    public void Percentile_WhenMax_Returns100()
    {
        var data = new Dictionary<int, int>
        {
            { 1, 10 }, { 2, 20 }, { 3, 30 }
        };
        double result = PercentileCalculator.Percentile(4, data);
        Assert.Equal(100.00, result);
    }

    [Fact]
    public void Percentile_EqualMax_Returns100()
    {
        var data = new Dictionary<int, int>
        {
            { 1, 10 }, { 2, 20 }, { 3, 30 }
        };
        double result = PercentileCalculator.Percentile(3, data);
        Assert.Equal(100.00, result);
    }
    
    [Fact]
    public void Percentile_WhenMin_Returns0()
    {
        var data = new Dictionary<int, int>
        {
            { 1, 10 }, { 2, 20 }, { 3, 30 }
        };
        double result = PercentileCalculator.Percentile(0, data);
        Assert.Equal(0.00, result);
    }
    
    [Fact]
    public void Percentile_EqualMin_ReturnsLowest()
    {
        var data = new Dictionary<int, int>
        {
            { 1, 10 }, { 2, 20 }, { 3, 30 }
        };
        //in the bottom with other 0 players, so 10% percentile
        double result = PercentileCalculator.Percentile(1, data);
        Assert.Equal(16.67, result);
    }
    
    [Fact]
    public void Percentile_WhenMiddle_Returns50()
    {
        var data = new Dictionary<int, int>
        {
            { 10, 50 },  { 30, 50 }
        };
        double result = PercentileCalculator.Percentile(20, data);

        Assert.Equal(50.00, result);
    }
    
    [Fact]
    public void Percentile_SingleEntry_Returns0Or100()
    {
        var data = new Dictionary<int, int>
        {
            { 42, 5 }
        };

        double result = PercentileCalculator.Percentile(42, data);
        Assert.Equal(100.00, result);
        result = PercentileCalculator.Percentile(41, data);
        Assert.Equal(0.00, result);
    }

    [Fact]
    public void Percentile_ZeroUsers_Returns0()
    {
        var data = new Dictionary<int, int>();
        double result = PercentileCalculator.Percentile(1, data);

        Assert.Equal(0.00, result);
    }
    
    [Fact]
    public void Percentile_AbsentValue_ReturnsCorrect()
    {
        var data = new Dictionary<int, int>
        {
            { 1, 10 }, { 5, 10 }, { 10, 10 }
        };
        double result = PercentileCalculator.Percentile(7, data);

        Assert.Equal(66.67, result);
    }
    
    [Fact]
    public void Percentile_WhenUnrounded_Rounds()
    {
        var data = new Dictionary<int, int>
        {
            { 1, 1 },
            { 2, 2 },
            { 3, 7 },
            { 4, 4 }
        };
        double result = PercentileCalculator.Percentile(1, data);

        Assert.Equal(7.14, result);
    }
}