import { Typography, useTheme } from "@mui/material";
import type { GridRecallPerformanceReport } from "../../../../types/GridRecall/GridRecallTypes"
import CenteredFlexBox from "../../../shared/CenteredFlexBox";
import LineChart from "../../../shared/LineChart";

const PerformanceReport: React.FC<{
    report: GridRecallPerformanceReport
}> = ({report}) => {
    const theme = useTheme();

    function mapToString(){
        let customString = '';
        Object.entries(report.usersPerLevel).forEach((value, key) => {
            customString += `${key}: ${value}, `;
        });
        return customString;
    }

    return (
        <CenteredFlexBox displayDirection="column" sx={{color: theme.palette.text.primary}}>
            <Typography>Percentile: {report.levelPercentile}</Typography>
            <Typography>Total Users: {report.timesPlayed}</Typography>
            <Typography>Histogram: {mapToString()}</Typography>

            <LineChart labels={Object.keys(report.usersPerLevel)} values={Object.values(report.usersPerLevel)}/>
        </CenteredFlexBox>
    )
}

export default PerformanceReport;