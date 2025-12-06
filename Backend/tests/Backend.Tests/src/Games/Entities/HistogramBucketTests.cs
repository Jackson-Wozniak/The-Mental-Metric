using Backend.Games.Entities;

namespace Backend.Tests.Games.Entities;

public class HistogramBucketTests
{
    [Fact]
    public void IsInRange_Values_ReturnsCorrect()
    {
        //values >= 1.0 and < 3.0 should be in range
        var bucket = new HistogramBucket
        {
            Count = 1,
            Value = 2.0,
            Delta = 1.0
        };
        
        Assert.True(bucket.IsInRange(2.0));
        Assert.True(bucket.IsInRange(1.0));
        Assert.True(bucket.IsInRange(.999));
        Assert.True(bucket.IsInRange(1.5));
        Assert.True(bucket.IsInRange(2.9));
        Assert.True(bucket.IsInRange(2.99));
        
        Assert.False(bucket.IsInRange(.99));
        Assert.False(bucket.IsInRange(2.999));
        Assert.False(bucket.IsInRange(3.0));
        Assert.False(bucket.IsInRange(4.0));
        Assert.False(bucket.IsInRange(.5));
    }
}