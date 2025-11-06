import { Box, Button } from "@mui/material";
import ContentContainer from "../Shared/ContentContainer"
import GameGrid from "./GameGrid";
import { useState } from "react";
import type { GridRecallState } from "./GridDispatch";
import GridGameSummary from "./GridGameSummary";
import { toGridRecallPerformance, type GridRecallPerformance } from "../../types/GridRecall/GridRecall";
import { CenteredFullWindow } from "../../styles/Shared";

const GridRecallPage: React.FC = () => {
    const [gameEnded, setGameEnded] = useState<boolean>();
    const [gameResults, setGameResults] = useState<GridRecallPerformance | undefined>();

    function handleGameOver(state: GridRecallState){
        setGameEnded(true);
        setGameResults(toGridRecallPerformance(state));
    }
    
    if(gameEnded && gameResults != undefined){
        return (
            <ContentContainer>
                <GridGameSummary gameResults={gameResults}/>
            </ContentContainer>
        )
    }

    return (
        <ContentContainer>
            <Box sx={{display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
                <GameGrid endGame={handleGameOver}/>
            </Box>
        </ContentContainer>
    )
}

export default GridRecallPage;