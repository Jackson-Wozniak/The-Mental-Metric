import type React from "react";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';
import CenteredFlexBox from "./CenteredFlexBox";
import { useTheme } from "@mui/material";

const LineChart: React.FC<{
    labels: any[],
    values: number[]
}> = ({labels, values}) => {
    const theme = useTheme();

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                color: theme.palette.text.secondary,
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
                color: theme.palette.text.secondary,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: theme.palette.text.secondary,
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    color: theme.palette.text.secondary,
                }
            }
        }
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: values,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <CenteredFlexBox displayDirection="row" sx={{width: "60%", height: "250px"}}>
            <Line data={data} options={options} height="100%" width="100%" />
        </CenteredFlexBox>
    )
}

export default LineChart;