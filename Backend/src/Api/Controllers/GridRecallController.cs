using Backend.Api.Dtos;
using Backend.Games.Entities;
using Backend.Games.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GridRecallController(GridRecallService gridRecallService) : ControllerBase
{
    [HttpPost]
    public IActionResult CreatePerformanceReport([FromBody] GridRecallStatsDto stats)
    {
        var mappedStats = stats.Map();
        var report = gridRecallService.CreateReport(mappedStats);
        return Ok(new GridRecallReportDto(report));
    }
}