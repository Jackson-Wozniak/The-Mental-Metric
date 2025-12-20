import { Box, Typography, useTheme } from "@mui/material";
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

            <Box width="90%" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                <LineChart labels={Object.keys(report.usersPerLevel)} values={Object.values(report.usersPerLevel)} title="Level Distribution" xLabel="Level" yLabel="# of Users"/>
                <LineChart labels={Object.keys(report.usersPerAccuracyRate)} values={Object.values(report.usersPerAccuracyRate)}title="Accuracy Rate Distribution" xLabel="Accuracy Rate (%)" yLabel="# of Users" valueType="percent"/>
                <LineChart labels={Object.keys(report.usersPerCorrectStreak)} values={Object.values(report.usersPerCorrectStreak)} title="Correct Streak Distribution" xLabel="Max Consecutive Correct" yLabel="# of Users"/>
            </Box>
        </CenteredFlexBox>
    )
}

export default PerformanceReport;