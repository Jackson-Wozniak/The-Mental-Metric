import type { GridRecallPerformanceStats } from "../../../types/GridRecall/GridRecallTypes"

export interface GridRecallState {
    level: number,
    totalGuesses: number,
    correctGuesses: number,
    maxCorrectStreak: number,
    currentCorrectStreak: number
}

export const inititalGridRecallState = {
    level: 1,
    totalGuesses: 0,
    correctGuesses: 0,
    maxCorrectStreak: 0,
    currentCorrectStreak: 0,
}

export function toPerformanceStats(state: GridRecallState): GridRecallPerformanceStats{
    return {
        level: state.level,
        totalGuesses: state.totalGuesses,
        correctGuesses: state.correctGuesses,
        maxCorrectStreak: state.maxCorrectStreak
    }
}

type GridRecallAction = 
    | { type: "IncrementLevel" }
    | { type: "HandleGuess", payload: boolean}

export const GridRecallReducer = (state: GridRecallState, action: GridRecallAction) => {
    switch(action.type){
        case "IncrementLevel": return {
            ...state,
            level: state.level + 1
        }
        case "HandleGuess": {
            const isCorrect: boolean = action.payload;
            const currentCorrectStreak = state.currentCorrectStreak + (isCorrect ? 1 : 0);
            const maxCorrectStreak = currentCorrectStreak > state.maxCorrectStreak ? currentCorrectStreak : state.maxCorrectStreak;
            return {
                ...state,
                totalGuesses: state.totalGuesses + 1,
                correctGuesses: state.correctGuesses + (action.payload ? 1 : 0),
                maxCorrectStreak: maxCorrectStreak,
                currentCorrectStreak: currentCorrectStreak,
            }
        }
    }
}