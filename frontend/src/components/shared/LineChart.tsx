import type React from "react";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';
import CenteredFlexBox from "./CenteredFlexBox";
import { useTheme } from "@mui/material";
import type { ChartOptions } from "chart.js/auto";
import { color } from "chart.js/helpers";

const LineChart: React.FC<{
    labels: any[],
    values: number[],
    title?: string,
    xLabel?: string,
    yLabel?: string,
    valueType?: "number" | "percent"
}> = ({labels, values, title, xLabel, yLabel, valueType = "number"}) => {
    const theme = useTheme();

    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: !!title,
                text: title,
                color: theme.palette.primary.main,
            },
        },
        scales: {
            x: {
                type: valueType === "percent" ? "category" : "linear" as any,
                title: {
                    display: !!xLabel,
                    text: xLabel,
                    color: theme.palette.primary.main
                },
                ticks: {
                    stepSize: 1,
                    color: theme.palette.text.primary,
                    callback: function(value: any) {
                        if(valueType === "percent") return value + "%"
                        return value;
                    }
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: !!yLabel,
                    text: yLabel,
                    color: theme.palette.primary.main
                },
                ticks: {
                    stepSize: 1,
                    color: theme.palette.text.primary,
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
                pointRadius: 0,
                color: theme.palette.primary.main,
            },
        ],
    };

    return (
        <CenteredFlexBox displayDirection="row" sx={{width: "30%", height: "250px"}}>
            <Line data={data} options={options} height="100%" width="100%" />
        </CenteredFlexBox>
    )
}

export default LineChart;