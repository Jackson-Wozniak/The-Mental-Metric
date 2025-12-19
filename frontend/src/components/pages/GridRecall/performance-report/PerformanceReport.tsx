import { Typography, useTheme } from "@mui/material";
import type { GridRecallPerformanceReport } from "../../../../types/GridRecall/GridRecallTypes"
import CenteredFlexBox from "../../../shared/CenteredFlexBox";
import LineChart from "../../../shared/LineChart";

const PerformanceReport: React.FC<{
    report: GridRecallPerformanceReport
}> = ({report}) => {
    const theme = useTheme();

    function mapToString(map: Map<number, number>){
        let customString = '';
        Object.entries(map).forEach((value, key) => {
            customString += `${key}: ${value}, `;
        });
        return customString;
    }

    return (
        <CenteredFlexBox displayDirection="column" sx={{color: theme.palette.text.primary}}>
            <Typography>Total Users: {report.timesPlayed}</Typography>

            <Typography>Level: {report.level} | Top {report.levelPercentile}%</Typography>

            <Typography>Accuracy Rate: {report.accuracyRate}% | Top {report.accuracyRatePercentile}%</Typography>
            <Typography>Correct Streak: {report.correctStreak} | Top {report.correctStreakPercentile}%</Typography>

            <LineChart labels={Object.keys(report.usersPerLevel)} values={Object.values(report.usersPerLevel)}/>
            <LineChart labels={Object.keys(report.usersPerAccuracyRate)} values={Object.values(report.usersPerAccuracyRate)}/>
            <LineChart labels={Object.keys(report.usersPerCorrectStreak)} values={Object.values(report.usersPerCorrectStreak)}/>
        </CenteredFlexBox>
    )
}

export default PerformanceReport;