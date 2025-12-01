import GameGrid from "./GameGrid";
import { useState } from "react";
import Page from "../../layout/Page";
import CenteredFlexBox from "../../shared/CenteredFlexBox";
import type { GridRecallPerformanceReport, GridRecallPerformanceStats } from "../../../types/GridRecall/GridRecallTypes";
import Typography from "@mui/material/Typography";
import { fetchCreatePerformanceReport } from "../../../api/GridRecallClient";
import PerformanceReport from "./performance-report/PerformanceReport";
import CircularProgress from "@mui/material/CircularProgress";

const GridRecallPage: React.FC = () => {
    const [gameEnded, setGameEnded] = useState<boolean>(false);
    const [performanceReport, setPerformanceReport] = useState<GridRecallPerformanceReport | undefined>();

    function handleGameEnd(stats: GridRecallPerformanceStats){
        setGameEnded(true);
        fetchCreatePerformanceReport(stats).then((report: GridRecallPerformanceReport) => {
            setPerformanceReport(report);
        });
    }

    if(gameEnded && performanceReport == undefined){
        return (
            <CircularProgress />
        )
    }

    if(performanceReport != undefined){
        return <PerformanceReport report={performanceReport}/>
    }

    return (
        <Page>
            <GameGrid handleGameEnd={handleGameEnd}/>
        </Page>
    )
}

export default GridRecallPage;