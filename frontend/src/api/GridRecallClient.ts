import type { GridRecallPerformanceReport, GridRecallPerformanceStats } from "../types/GridRecall/GridRecallTypes";

const BaseUrl = "https://localhost:7033/api/GridRecall";

export async function fetchCreatePerformanceReport(stats: GridRecallPerformanceStats): Promise<GridRecallPerformanceReport>{
    const response = await fetch(`${BaseUrl}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(stats)
    });

    //TODO: error processing
    const json = await response.json() as GridRecallPerformanceReport;

    return json;
}