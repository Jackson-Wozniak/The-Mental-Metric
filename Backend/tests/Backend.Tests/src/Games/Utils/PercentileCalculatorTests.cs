using Backend.Games.Utils;

namespace Backend.Tests.Games.Utils;

public class PercentileCalculatorTests
{
    [Fact]
    public void Percentile_IntegerWhenMax_Returns100()
    {
        var data = new Dictionary<int, int>
        {
            { 1, 10 }, { 2, 20 }, { 3, 30 }
        };
        double result = PercentileCalculator.Percentile(4, data);
        Assert.Equal(100.00, result);
    }
    
    [Fact]
    public void Percentile_DoubleWhenMax_Returns100()
    {
        var data = new Dictionary<double, int>
        {
            { 1.0, 10 }, { 2.0, 20 }, { 3.0, 30 }
        };
        double result = PercentileCalculator.Percentile(4.0, data);
        Assert.Equal(100.00, result);
    }

    [Fact]
    public void Percentile_IntegerEqualMax_Returns100()
    {
        var data = new Dictionary<int, int>
        {
            { 1, 10 }, { 2, 20 }, { 3, 30 }
        };
        double result = PercentileCalculator.Percentile(3, data);
        Assert.Equal(100.00, result);
    }
    
    [Fact]
    public void Percentile_DoubleEqualMax_Returns100()
    {
        var data = new Dictionary<double, int>
        {
            { 1.0, 10 }, { 2.0, 20 }, { 3.0, 30 }
        };
        double result = PercentileCalculator.Percentile(3.0, data);
        Assert.Equal(100.00, result);
    }
    
    [Fact]
    public void Percentile_IntegerWhenMin_Returns0()
    {
        var data = new Dictionary<int, int>
        {
            { 1, 10 }, { 2, 20 }, { 3, 30 }
        };
        double result = PercentileCalculator.Percentile(0, data);
        Assert.Equal(0.00, result);
    }
    
    [Fact]
    public void Percentile_DoubleWhenMin_Returns0()
    {
        var data = new Dictionary<double, int>
        {
            { 1.0, 10 }, { 2.0, 20 }, { 3.0, 30 }
        };
        double result = PercentileCalculator.Percentile(0.0, data);
        Assert.Equal(0.00, result);
    }
    
    [Fact]
    public void Percentile_IntegerEqualMin_ReturnsLowest()
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
    public void Percentile_DoubleEqualMin_ReturnsLowest()
    {
        var data = new Dictionary<double, int>
        {
            { 1.0, 10 }, { 2.0, 20 }, { 3.0, 30 }
        };
        //in the bottom with other 0 players, so 10% percentile
        double result = PercentileCalculator.Percentile(1.0, data);
        Assert.Equal(16.67, result);
    }
    
    [Fact]
    public void Percentile_IntegerWhenMiddle_Returns50()
    {
        var data = new Dictionary<int, int>
        {
            { 10, 50 },  { 30, 50 }
        };
        double result = PercentileCalculator.Percentile(20, data);

        Assert.Equal(50.00, result);
    }
    
    [Fact]
    public void Percentile_DoubleWhenMiddle_Returns50()
    {
        var data = new Dictionary<double, int>
        {
            { 10.0, 50 },  { 30.0, 50 }
        };
        double result = PercentileCalculator.Percentile(20.0, data);

        Assert.Equal(50.00, result);
    }
    
    [Fact]
    public void Percentile_IntegerSingleEntry_Returns0Or100()
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
    public void Percentile_DoubleSingleEntry_Returns0Or100()
    {
        var data = new Dictionary<double, int>
        {
            { 42.0, 5 }
        };

        double result = PercentileCalculator.Percentile(42.0, data);
        Assert.Equal(100.00, result);
        result = PercentileCalculator.Percentile(41.0, data);
        Assert.Equal(0.00, result);
        
        data = new Dictionary<double, int>
        {
            { 88.61, 1 }
        };

        result = PercentileCalculator.Percentile(88.61, data);
        Assert.Equal(100.00, result);
        result = PercentileCalculator.Percentile(88.605, data);
        Assert.Equal(0.00, result);
        result = PercentileCalculator.Percentile(88.60, data);
        Assert.Equal(0.00, result);
        result = PercentileCalculator.Percentile(88.604, data);
        Assert.Equal(0.00, result);
    }

    [Fact]
    public void Percentile_IntegerZeroUsers_Returns0()
    {
        var data = new Dictionary<int, int>();
        double result = PercentileCalculator.Percentile(1, data);

        Assert.Equal(0.00, result);
    }
    
    [Fact]
    public void Percentile_DoubleZeroUsers_Returns0()
    {
        var data = new Dictionary<double, int>();
        double result = PercentileCalculator.Percentile(1.0, data);

        Assert.Equal(0.00, result);
    }
    
    [Fact]
    public void Percentile_IntegerAbsentValue_ReturnsCorrect()
    {
        var data = new Dictionary<int, int>
        {
            { 1, 10 }, { 5, 10 }, { 10, 10 }
        };
        double result = PercentileCalculator.Percentile(7, data);

        Assert.Equal(66.67, result);
    }
    
    [Fact]
    public void Percentile_DoubleAbsentValue_ReturnsCorrect()
    {
        var data = new Dictionary<double, int>
        {
            { 1.0, 10 }, { 5.0, 10 }, { 10.0, 10 }
        };
        double result = PercentileCalculator.Percentile(7.0, data);

        Assert.Equal(66.67, result);
    }
    
    [Fact]
    public void Percentile_IntegerUnrounded_Rounds()
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
    
    [Fact]
    public void Percentile_DoubleUnrounded_Rounds()
    {
        var data = new Dictionary<double, int>
        {
            { 1.0, 1 },
            { 2.0, 2 },
            { 3.0, 7 },
            { 4.0, 4 }
        };
        double result = PercentileCalculator.Percentile(1.0, data);

        Assert.Equal(7.14, result);
    }
}