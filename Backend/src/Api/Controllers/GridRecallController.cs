using Backend.Api.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GridRecallController : ControllerBase
{
    [HttpPost]
    public IActionResult CreatePerformanceReport([FromBody] GridRecallStatsDto stats)
    {
        Dictionary<int, int> usersPerLevel = [];
        int totalUsers = 0;
        
        usersPerLevel.Add(1, 10);   totalUsers += 10;
        usersPerLevel.Add(2, 100);  totalUsers += 100;
        usersPerLevel.Add(3, 50);   totalUsers += 50;
        usersPerLevel.Add(4, 30);   totalUsers += 30;

        usersPerLevel.Add(5, 25);   totalUsers += 25;
        usersPerLevel.Add(6, 22);   totalUsers += 22;
        usersPerLevel.Add(7, 20);   totalUsers += 20;
        usersPerLevel.Add(8, 18);   totalUsers += 18;
        usersPerLevel.Add(9, 16);   totalUsers += 16;
        usersPerLevel.Add(10, 15);  totalUsers += 15;

        usersPerLevel.Add(11, 14);  totalUsers += 14;
        usersPerLevel.Add(12, 13);  totalUsers += 13;
        usersPerLevel.Add(13, 12);  totalUsers += 12;
        usersPerLevel.Add(14, 11);  totalUsers += 11;
        usersPerLevel.Add(15, 10);  totalUsers += 10;

        usersPerLevel.Add(16, 9);   totalUsers += 9;
        usersPerLevel.Add(17, 9);   totalUsers += 9;
        usersPerLevel.Add(18, 8);   totalUsers += 8;
        usersPerLevel.Add(19, 8);   totalUsers += 8;
        usersPerLevel.Add(20, 7);   totalUsers += 7;

        usersPerLevel.Add(21, 6);   totalUsers += 6;
        usersPerLevel.Add(22, 6);   totalUsers += 6;
        usersPerLevel.Add(23, 5);   totalUsers += 5;
        usersPerLevel.Add(24, 5);   totalUsers += 5;
        usersPerLevel.Add(25, 4);   totalUsers += 4;

        usersPerLevel.Add(26, 4);   totalUsers += 4;
        usersPerLevel.Add(27, 3);   totalUsers += 3;
        usersPerLevel.Add(28, 3);   totalUsers += 3;
        usersPerLevel.Add(29, 2);   totalUsers += 2;
        usersPerLevel.Add(30, 2);   totalUsers += 2;

        int level = stats.FinalLevel;
        int usersTiedOrBelow = usersPerLevel
            .Where(u => u.Key <= level)
            .Select(u => u.Value)
            .Sum();
        double percentile = ((double) usersTiedOrBelow / totalUsers) * 100.0;
        
        return new JsonResult(new GridRecallReportDto(usersPerLevel, percentile, totalUsers));
    }
}