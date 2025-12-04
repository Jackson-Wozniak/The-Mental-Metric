import { useState } from 'react';
import React from 'react';
import GridLevelStart from './game/GridLevelStart';
import GridScoreboard from './game/GridScoreboard';
import CenteredFlexBox from '../../shared/CenteredFlexBox';
import ButtonGrid from './game/ButtonGrid';
import { GRID_RECALL_ALLOWED_MISSES } from '../../../config/GridRecallConstants';
import type { GridRecallPerformanceStats } from '../../../types/GridRecall/GridRecallTypes';

const GameGrid: React.FC<{
    handleGameEnd: (stats: GridRecallPerformanceStats) => void
}> = ({handleGameEnd}) => {
    const [level, setLevel] = useState(1);
    const [livesRemaining, setLivesRemaining] = useState(GRID_RECALL_ALLOWED_MISSES);
    const [levelStarted, setLevelStarted] = useState<boolean>(false);

    if(!levelStarted){
        return (
            <GridLevelStart level={level} startLevel={() => setLevelStarted(true)} missesLeft={livesRemaining}/>
        )
    }

    function handleLevelEnd(){
        setLevelStarted(false);
        setLevel(level + 1);
    }

    function handleIncorrectGuess(){
        if(livesRemaining == 1){
            handleGameEnd({finalLevel: level});
            return;
        }
        setLivesRemaining(livesRemaining - 1);
    }

    return (
        <CenteredFlexBox displayDirection="column">
            <GridScoreboard level={level} livesLeft={livesRemaining}/>
            <ButtonGrid level={level} livesLeft={livesRemaining}
                handleIncorrectGuess={handleIncorrectGuess} completeLevel={handleLevelEnd}/>
        </CenteredFlexBox>
    )
}

export default GameGrid;