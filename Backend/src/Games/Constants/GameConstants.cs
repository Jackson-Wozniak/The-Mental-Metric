using Backend.Games.Definitions;
using Backend.Games.Entities;

namespace Backend.Games.Constants;

public class GameConstants
{
    public static readonly Dictionary<string, Game> GameDefinitions = new()
    {
        {"Grid Recall", GridRecallDefinition.Get()}
    };
}