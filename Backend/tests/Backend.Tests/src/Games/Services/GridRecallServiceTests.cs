using Backend.Data;
using Backend.Games.Constants;
using Backend.Games.Definitions;
using Backend.Games.Objects;
using Backend.Games.Repositories;
using Backend.Games.Services;
using Microsoft.EntityFrameworkCore;

namespace Backend.Tests.Games.Services;

public class GridRecallServiceTests
{
    private GameRepository BuildRepository()
    {
        var context = new ApplicationDbContext(
            new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString()).Options);
        return new GameRepository(context);
    }
    
    [Fact]
    public void CreateReport_EmptyMetric_ReturnsCorrectValues()
    {
        var repository = BuildRepository();
        var gridRecallService = new GridRecallService(new GameMetricService(repository));
        
        repository.Save(GridRecallDefinition.Get());

        var report = gridRecallService.CreateReport(new GridRecallStats(1, 0, 0,0));
        
        Assert.Equal(1, report.TimesPlayed);
        Assert.Equal(100.00, report.LevelPercentile);
        Assert.Equal(1, report.UsersPerLevel[1]);
    }
    
    [Fact]
    public void CreateReport_PopulatedMetric_ReturnsCorrectValues()
    {
        var repository = BuildRepository();
        var gridRecallService = new GridRecallService(new GameMetricService(repository));

        var game = GridRecallDefinition.Get();
        var metric = game.Metrics.SingleOrDefault(m =>
            m.MetricName.Equals(GridRecallConstants.LevelMetricName));
        Assert.NotNull(metric);
        metric.HistogramBuckets.Single(b => (int)b.Value == 1).Count = 1;
        metric.HistogramBuckets.Single(b => (int)b.Value == 2).Count = 1;
        metric.HistogramBuckets.Single(b => (int)b.Value == 3).Count = 1;
        
        repository.Save(game);

        var report = gridRecallService.CreateReport(new GridRecallStats(2, 0, 0, 0));
        
        Assert.Equal(4, report.TimesPlayed);
        Assert.Equal(75.00, report.LevelPercentile);
        Assert.Equal(1, report.UsersPerLevel[1]);
        Assert.Equal(2, report.UsersPerLevel[2]);
        Assert.Equal(1, report.UsersPerLevel[3]);
    }
}