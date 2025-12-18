//object to hold the users performance of grid recall after game ends
export interface GridRecallPerformanceStats{
    level: number,
    totalGuesses: number,
    correctGuesses: number,
    maxCorrectStreak: number,
}

//object to be returned by server for percentile and comparison info later on
export interface GridRecallPerformanceReport{
    usersPerLevel: Map<number, number>,
    levelPercentile: number,
    level: number,
    timesPlayed: number
}