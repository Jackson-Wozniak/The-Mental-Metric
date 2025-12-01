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
    }
}