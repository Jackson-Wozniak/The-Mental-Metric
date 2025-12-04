using Backend.Api.Dtos;
using Backend.Games.Entities;
using Backend.Games.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GridRecallController(GameMetricService gameMetricService) : ControllerBase
{
    [HttpPost]
    public IActionResult CreatePerformanceReport([FromBody] GridRecallStatsDto stats)
    {
        Dictionary<int, int> usersPerLevel = [];
        int totalUsers = 0;

        int level = stats.FinalLevel;
        
        GameMetric metric = gameMetricService.InsertHistogramEntry(
            "Grid Recall", "Level", level);

        usersPerLevel = metric.HistogramBuckets
            .ToDictionary(b => (int)(b.MaxValue + b.MinValue) / 2,
                b => (int)b.Count);
        totalUsers = usersPerLevel.Values.Sum();
        if (totalUsers == 0) totalUsers = 1; 
        
        int usersTiedOrBelow = usersPerLevel
            .Where(u => u.Key <= level)
            .Select(u => u.Value)
            .Sum();
        double percentile = ((double) usersTiedOrBelow / totalUsers) * 100.0;
        
        return new JsonResult(new GridRecallReportDto(usersPerLevel, percentile, totalUsers));
    }
}