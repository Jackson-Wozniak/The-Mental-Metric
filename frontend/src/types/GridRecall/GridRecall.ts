import type { GridLevelStats, GridRecallState } from "../../components/GridRecall/GridDispatch";
import { findGridLevelProperties, MAX_GRID_WIDTH } from "../../utils/GridRecall/GridRecallProperties";
import type { ButtonState } from "./GridEnums";

export interface GridButtonState {
    index: number,
    state: ButtonState
}

export interface GridLevelPerformance {
    level: number,
    averageTimeBetweenGuesses: number,
    totalTimeTaken: number,
}

export interface GridButtonAccuracy {
    index: number,
    correctGuesses: number,
    incorrectGuesses: number
}

export interface GridRecallPerformance {
    completedLevels: number,
    levelPerformance: GridLevelPerformance[]
    buttonAccuracy: GridButtonAccuracy[]
}

function toTimestamps(times: number[]){
        let intitialGuess = times[0];
        const durations = [];
        for(let i = 1; i < times.length; i++){
            durations.push(times[i] - intitialGuess);
            intitialGuess = times[i];
        }
        return durations;
    }

    function average(times: number[]){
        return times.reduce((acc, curr) => acc + curr, 0) / times.length;
    }

function toGridLevelPerformance(stats: GridLevelStats){
    const levelPerformance: GridLevelPerformance = {
        level: stats.level,
        averageTimeBetweenGuesses: average(toTimestamps(stats.timeOfGuesses)),
        totalTimeTaken: stats.timeOfGuesses[stats.timeOfGuesses.length - 1] - stats.startTime
    }
    return levelPerformance;
}

function toGridButtonAccuracy(levelStats: Map<number, GridLevelStats>){
    const buttonMap: Map<number, number[]> = new Map();
    for(let i = 0; i < MAX_GRID_WIDTH * MAX_GRID_WIDTH; i++){
        buttonMap.set(i, [0, 0]);
    }

    levelStats.forEach((value: GridLevelStats, _: number) => {
        value.correctGuesses.forEach((index: number) => {
            const entry: number[] | undefined = buttonMap.get(index);
            if(entry == null) return;
            entry[0] += 1;
        });
        value.incorrectGuesses.forEach((index: number) => {
            const entry: number[] | undefined = buttonMap.get(index);
            if(entry == null) return;
            entry[1] += 1;
        });
    });
    return Array.from(buttonMap).map(([key, value]) => {
        const accuracy: GridButtonAccuracy = {
            index: key,
            correctGuesses: value[0],
            incorrectGuesses: value[1]
        }
        return accuracy;
    })
}

export function toGridRecallPerformance(state: GridRecallState): GridRecallPerformance{
    const levelStats = new Map([...state.levelStats].filter(([_, stats]) =>
        stats.correctGuesses.length == findGridLevelProperties(stats.level).buttonFlashCount
    ));
    return {
        completedLevels: levelStats.size,
        levelPerformance: Array.from(levelStats.values()).map(toGridLevelPerformance),
        buttonAccuracy: toGridButtonAccuracy(levelStats)
    }
}
