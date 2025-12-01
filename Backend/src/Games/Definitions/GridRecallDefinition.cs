using Backend.Games.Entities;

namespace Backend.Games.Definitions;

public class GridRecallDefinition
{
    //returns the initial game metrics, name etc.
    //this enforces game-specific attributes during initialization
    public static Game Get()
    {
        return new Game();
    }
}