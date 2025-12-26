import type { GridRecallLevelState } from "../../components/pages/GridRecall/GridDispatch"

//object to hold the users performance of grid recall after game ends
export interface GridRecallPerformanceStats{
    level: number,
    totalGuesses: number,
    correctGuesses: number,
    maxCorrectStreak: number,
    levelStats: GridRecallLevelState[]
}

//object to be returned by server for percentile and comparison info later on
export interface GridRecallPerformanceReport{
    timesPlayed: number,

    level: number,
    levelPercentile: number,
    usersPerLevel: Map<number, number>,
    
    accuracyRate: number,
    accuracyRatePercentile: number,
    usersPerAccuracyRate: Map<number, number>,

    correctStreak: number,
    correctStreakPercentile: number,
    usersPerCorrectStreak: Map<number, number>
}