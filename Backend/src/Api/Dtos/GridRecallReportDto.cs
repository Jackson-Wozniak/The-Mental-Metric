namespace Backend.Api.Dtos;

public class GridRecallReportDto
{
    public Dictionary<int, int> UsersPerLevelMap { get; set; } = [];
    public double FinalLevelPercentile { get; set; }
    public int TotalUsers { get; set; }

    public GridRecallReportDto(Dictionary<int, int> histogram, double finalLevelPercentile, int totalUsers)
    {
        UsersPerLevelMap = histogram;
        FinalLevelPercentile = finalLevelPercentile;
        TotalUsers = totalUsers;
    }
}