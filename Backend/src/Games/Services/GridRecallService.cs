using Backend.Games.Objects;

namespace Backend.Games.Services;

public class GridRecallService(GameMetricService gameMetricService)
{
    public GridRecallReport GenerateReport(GridRecallStats stats)
    {
        return new GridRecallReport();
    }
}