import type { GridRecallPerformanceStats } from "../../../types/GridRecall/GridRecallTypes"

export interface Guess{
    buttonId: number,
    isCorrect: boolean,
    timestamp: number
}

export interface GridRecallLevelState{
    level: number,
    timeStarted: number,
    guesses: Guess[]
}

export interface GridRecallState {
    level: number,
    totalGuesses: number,
    correctGuesses: number,
    maxCorrectStreak: number,
    currentCorrectStreak: number,
    levels: GridRecallLevelState[]
}

export const inititalGridRecallState = {
    level: 1,
    totalGuesses: 0,
    correctGuesses: 0,
    maxCorrectStreak: 0,
    currentCorrectStreak: 0,
    levels: []
}

export function toPerformanceStats(state: GridRecallState): GridRecallPerformanceStats{
    return {
        level: state.level,
        totalGuesses: state.totalGuesses,
        correctGuesses: state.correctGuesses,
        maxCorrectStreak: state.maxCorrectStreak,
        levelStats: state.levels
    }
}

type GridRecallAction = 
    | { type: "IncrementLevel" }
    | { type: "LevelReady", payload: {startedAt: number}}
    | { type: "HandleGuess", payload: Guess}

export const GridRecallReducer = (state: GridRecallState, action: GridRecallAction) => {
    switch(action.type){
        case "IncrementLevel": return {
            ...state,
            level: state.level + 1
        }
        case "LevelReady": return {
            ...state,
            levels: [...state.levels, {level: state.level, timeStarted: action.payload.startedAt, guesses: []}]
        }
        case "HandleGuess": {
            const currentLevel = state.levels[state.levels.length - 1]
            const guess: Guess = action.payload;
            const currentCorrectStreak = guess.isCorrect ? (state.currentCorrectStreak + 1) : 0;
            const maxCorrectStreak = currentCorrectStreak > state.maxCorrectStreak ? currentCorrectStreak : state.maxCorrectStreak;
            return {
                ...state,
                totalGuesses: state.totalGuesses + 1,
                correctGuesses: state.correctGuesses + (action.payload ? 1 : 0),
                maxCorrectStreak: maxCorrectStreak,
                currentCorrectStreak: currentCorrectStreak,
                levels: [...state.levels.slice(0, -1), {
                    ...currentLevel,
                    guesses: [...currentLevel.guesses, guess]
                }]
            }
        }
    }
}