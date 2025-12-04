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
        report.usersPerLevelMap.forEach((value, key) => {
            customString += `${key}: ${value}, `;
        });
        return customString;
    }

    return (
        <CenteredFlexBox displayDirection="column" sx={{color: theme.palette.text.primary}}>
            <Typography>Percentile: {report.finalLevelPercentile}</Typography>
            <Typography>Total Users: {report.totalUsers}</Typography>
            <Typography>Histogram: {mapToString()}</Typography>

            <LineChart labels={Array.from(report.usersPerLevelMap.keys())} values={Array.from(report.usersPerLevelMap.values())}/>
        </CenteredFlexBox>
    )
}

export default PerformanceReport;