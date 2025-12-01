//object to hold the users performance of grid recall after game ends
export interface GridRecallPerformanceStats{
    finalLevel: number
}

//object to be returned by server for percentile and comparison info later on
export interface GridRecallPerformanceReport{
    usersPerLevelMap: Map<number, number>,
    finalLevelPercentile: number,
    totalUsers: number
}