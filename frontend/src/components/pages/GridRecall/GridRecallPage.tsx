import GameGrid from "./GameGrid";
import { useState } from "react";
import type { GridRecallState } from "./GridDispatch";
import Page from "../../layout/Page";

const GridRecallPage: React.FC = () => {
    const [gameEnded, setGameEnded] = useState<boolean>();

    function handleGameOver(state: GridRecallState){
        setGameEnded(true);
    }

    return (
        <Page>
            <GameGrid endGame={handleGameOver}/>
        </Page>
    )
}

export default GridRecallPage;