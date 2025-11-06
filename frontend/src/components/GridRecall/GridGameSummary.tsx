import { useEffect, useState } from "react";
import type { GridRecallPerformance, GridButtonAccuracy, GridLevelPerformance } from "../../types/GridRecall/GridRecall";
import { Box, Typography, Button } from "@mui/material";
import { CenteredFullWindow } from "../../styles/Shared";
import { GRID_RECALL_ALLOWED_MISSES } from "../../utils/GridRecall/GridRecallProperties";
import type { GridRecallPerformanceReport } from "../../types/GridRecall/GridRecallDto";
import { fetchEvalulateGridPerformance } from "../../api/GridRecallClient";
import 'chart.js/auto'
import { Line } from 'react-chartjs-2';
import { BorderColor } from "@mui/icons-material";

const options: any = {
        responsive: true,
        animation: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        scales: {
          y: {
            min: 0,
            max: 4000,
            grid: {
              borderColor: "#121212",
              borderWidth: 4,
            },
            ticks: {
              color: "#121212",
              font: {
                size: 18,
              },
            },
          },
          x: {
            grid: {
              borderColor: "#121212",
              borderWidth: 4,
            },
            ticks: {
              color: "#121212",
              font: {
                size: 18,
              },
            },
          },
        },
    };

const GridGameSummary: React.FC<{
    gameResults: GridRecallPerformance
}> = ({gameResults}) => {
    const [chartData, setChartData] = useState<any>(null);

    const [showLandingPage, setShowLandingPage] = useState<boolean>(true);
    const [performanceReport, setPerformanceReport] = useState<GridRecallPerformanceReport | undefined>();

    useEffect(() => {
        // fetchEvalulateGridPerformance(gameResults).then((report: GridRecallPerformanceReport) => {
        //     setPerformanceReport(report);
        // });

        const labels = gameResults.levelPerformance.map(entry => entry.level);

            const datasets = gameResults.levelPerformance.map(entry => {
                return {
                    label: entry.level,
                    data: gameResults.levelPerformance.map(entry => entry.totalTimeTaken),
                    BorderColor: '#0000FF',
                    backgroundColor: '#0000FF',
                    fill: false,
                    borderWidth: 2,
              };
            });
            
            console.log(labels);
            console.log(datasets);
            setChartData({
              labels,
              datasets,
            });
    }, [gameResults])

    // if(showLandingPage || performanceReport == null){
    //     return (
    //         <Box sx={CenteredFullWindow()}>
    //             <Typography variant="h3" color="textPrimary">Level {gameResults.completedLevels}</Typography>
    //             <br/>
    //             <Button onClick={() => setShowLandingPage(false)} variant="contained">Show My Performance</Button>
    //         </Box>
    //     )
    // }

    return (
        <Box sx={CenteredFullWindow()}>
            {chartData && <Line data={chartData} options={options} />}
        </Box>
    )
}

export default GridGameSummary;