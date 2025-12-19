using Backend.Games.Definitions;
using Backend.Games.Entities;

namespace Backend.Games.Constants;

public class GameConstants
{
    public static readonly List<string> GameNames = [GridRecallConstants.Name];

    public static Game GetGameDefinition(string name)
    {
        return name switch
        {
            GridRecallConstants.Name => GridRecallDefinition.Get(),
            _ => throw new Exception()
        };
    }
}