using Backend.Core.Data;
using Backend.Core.Entity;
using Microsoft.EntityFrameworkCore;

namespace Backend.Core.Repository;

public class GameRepository(ApplicationDbContext context)
{
    public void Save(Game game)
    {
        context.Games.Add(game);
        context.SaveChanges();
    }

    public void Update(Game game)
    {
        context.Games.Update(game);
        context.SaveChanges();
    }
    
    public Game? FindById(long id)
    {
        return context.Games
            .Include(g => g.Metrics)
            .ThenInclude(m => m.HistogramBuckets)
            .SingleOrDefault(g => g.Id == id);
    }
    
    public Game? FindByName(string name)
    {
        return context.Games
            .Include(g => g.Metrics)
            .ThenInclude(m => m.HistogramBuckets)
            .SingleOrDefault(g => g.Name == name);
    }
}