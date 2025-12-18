namespace Backend.Games.Objects;

public class GridRecallStats
{
    public int Level { get; set; }
    public double AccuracyRate { get; set; }
    public int CorrectStreak { get; set; }
    
    protected GridRecallStats(){ }

    public GridRecallStats(int level, int total, int correct, int correctStreak)
    {
        Level = level;
        AccuracyRate = Math.Round((double) correct / total * 100.0, 2);
        CorrectStreak = correctStreak;
    }
}