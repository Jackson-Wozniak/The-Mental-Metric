import GameGrid from "./GameGrid";
import { useState } from "react";
import Page from "../../layout/Page";

const GridRecallPage: React.FC = () => {
    const [gameEnded, setGameEnded] = useState<boolean>();

    if(gameEnded){
        return <></>
    }

    return (
        <Page>
            <GameGrid endGame={() => setGameEnded(true)}/>
        </Page>
    )
}

export default GridRecallPage;