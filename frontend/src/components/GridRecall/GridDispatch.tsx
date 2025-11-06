import { GRID_RECALL_ALLOWED_MISSES } from "../../utils/GridRecall/GridRecallProperties"

export interface GridLevelStats {
    level: number,
    timeOfGuesses: number[],
    startTime: number,
    correctGuesses: number[],
    incorrectGuesses: number[]
}

export interface GridRecallState {
    level: number,
    score: number,
    missesLeft: number,
    levelStats: Map<number, GridLevelStats>
}

export const inititalGridRecallState = {
    level: 1,
    score: 0,
    missesLeft: GRID_RECALL_ALLOWED_MISSES,
    levelStats: new Map<number, GridLevelStats>()
}

type GridRecallAction = 
    | { type: "StartLevel" }
    | { type: "CorrectGuess", payload: { timestamp: number, index: number } }
    | { type: "IncorrectGuess", payload: number }
    | { type: "IncrementLevel" }

function initializeLevel(map: Map<number, GridLevelStats>, level: number){
    const mapCopy = new Map(map);
    const levelStats: GridLevelStats = {
        level: level,
        startTime: Date.now(),
        timeOfGuesses: [],
        correctGuesses: [],
        incorrectGuesses: []
    }
    mapCopy.set(level, levelStats);
    return mapCopy;
}

function updateLevelStats(map: Map<number, GridLevelStats>, level: number, 
    updateFn: (stats: GridLevelStats) => GridLevelStats): Map<number, GridLevelStats> {
    const mapCopy = new Map(map);
    const oldStats = map.get(level);
    if (oldStats) {
        mapCopy.set(level, updateFn(oldStats));
    }
    return mapCopy;
}

export const GridRecallReducer = (state: GridRecallState, action: GridRecallAction) => {
    switch(action.type){
        case "StartLevel": return { 
            ...state, 
            levelStats: initializeLevel(state.levelStats, state.level)
        }
        case "CorrectGuess": return {
            ...state,
            score: state.score + 1,
            levelStats: updateLevelStats(state.levelStats, state.level, oldStats => ({
                ...oldStats,
                timeOfGuesses: [...oldStats.timeOfGuesses, action.payload.timestamp],
                correctGuesses: [...oldStats.correctGuesses, action.payload.index]
            }))
        }
        case "IncorrectGuess": return {
            ...state,
            missesLeft: state.missesLeft - 1,
            levelStats: updateLevelStats(state.levelStats, state.level, oldStats => ({
                ...oldStats,
                incorrectGuesses: [...oldStats.incorrectGuesses, action.payload]
            }))
        }
        case "IncrementLevel": return {
            ...state,
            level: state.level + 1
        }
    }
}