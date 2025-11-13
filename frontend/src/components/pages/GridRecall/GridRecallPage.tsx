import GameGrid from "./GameGrid";
import { useState } from "react";
import type { GridRecallState } from "./GridDispatch";
import { toGridRecallPerformance, type GridRecallPerformance } from "../../../types/GridRecall/GridRecall";
import Page from "../../layout/Page";

const GridRecallPage: React.FC = () => {
    const [gameEnded, setGameEnded] = useState<boolean>();
    const [gameResults, setGameResults] = useState<GridRecallPerformance | undefined>();

    function handleGameOver(state: GridRecallState){
        setGameEnded(true);
        setGameResults(toGridRecallPerformance(state));
    }

    return (
        <Page>
            <GameGrid endGame={handleGameOver}/>
        </Page>
    )
}

export default GridRecallPage;