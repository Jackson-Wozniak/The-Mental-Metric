import { useReducer, useState } from 'react';
import React from 'react';
import GridLevelStart from './game/GridLevelStart';
import GridScoreboard from './game/GridScoreboard';
import CenteredFlexBox from '../../shared/CenteredFlexBox';
import ButtonGrid from './game/ButtonGrid';
import { GRID_RECALL_ALLOWED_MISSES } from '../../../config/GridRecallConstants';
import type { GridRecallPerformanceStats } from '../../../types/GridRecall/GridRecallTypes';
import { GridRecallReducer, inititalGridRecallState, toPerformanceStats } from './GridDispatch';

const GameGrid: React.FC<{
    handleGameEnd: (stats: GridRecallPerformanceStats) => void
}> = ({handleGameEnd}) => {
    const [gridRecallState, gridRecallDispatch] = useReducer(GridRecallReducer, inititalGridRecallState);
    const [livesRemaining, setLivesRemaining] = useState(GRID_RECALL_ALLOWED_MISSES);
    const [isLevelStarted, setIsLevelStarted] = useState<boolean>(false);

    if(!isLevelStarted){
        return (
            <GridLevelStart level={gridRecallState.level} startLevel={() => setIsLevelStarted(true)} missesLeft={livesRemaining}/>
        )
    }

    function handleLevelEnd(){
        setIsLevelStarted(false);
        gridRecallDispatch({type: "IncrementLevel"});
    }

    function handleLevelBegin(timestamp: number){
        gridRecallDispatch({type: "LevelReady", payload: {startedAt: timestamp}});
    }

    function handleGuess(buttonId: number, isCorrect: boolean, timestamp: number){
        gridRecallDispatch({type: "HandleGuess", payload: {buttonId: buttonId, isCorrect: isCorrect, timestamp: timestamp}});
        if(!isCorrect){
            if(livesRemaining == 1){
                handleGameEnd(toPerformanceStats(gridRecallState));
                return;
            }   
            setLivesRemaining(livesRemaining - 1);
            return;
        }
    }

    return (
        <CenteredFlexBox displayDirection="column">
            <GridScoreboard level={gridRecallState.level} livesLeft={livesRemaining}/>
            <ButtonGrid level={gridRecallState.level} livesLeft={livesRemaining}
                handleGuess={handleGuess} completeLevel={handleLevelEnd} beginLevelTracking={handleLevelBegin}/>
        </CenteredFlexBox>
    )
}

export default GameGrid;