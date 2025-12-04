using Backend.Games.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
    : DbContext(options)
{
    public DbSet<Game> Games { get; set; }
    public DbSet<GameMetric> GameMetrics { get; set; }
    public DbSet<HistogramBucket> HistogramBuckets { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<Game>()
            .HasMany(g => g.Metrics)
            .WithOne(m => m.Game)
            .HasForeignKey(m => m.GameId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<GameMetric>()
            .HasMany(m => m.HistogramBuckets)
            .WithOne(b => b.GameMetric)
            .HasForeignKey(b => b.GameMetricId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}