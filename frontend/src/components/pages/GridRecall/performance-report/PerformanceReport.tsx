import { Typography } from "@mui/material";
import type { GridRecallPerformanceReport } from "../../../../types/GridRecall/GridRecallTypes"
import CenteredFlexBox from "../../../shared/CenteredFlexBox";


const PerformanceReport: React.FC<{
    report: GridRecallPerformanceReport
}> = ({report}) => {
    return (
        <CenteredFlexBox displayDirection="column">
            <Typography>Percentile: {report.finalLevelPercentile}</Typography>
            <Typography>Total Users: {report.totalUsers}</Typography>
            <Typography>Histogram: {report.usersPerLevelMap}</Typography>
        </CenteredFlexBox>
    )
}

export default PerformanceReport;