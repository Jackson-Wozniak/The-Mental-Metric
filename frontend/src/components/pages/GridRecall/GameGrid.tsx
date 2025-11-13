import { useTheme } from '@mui/material';
import { useReducer, useState } from 'react';
import { GridRecallReducer, inititalGridRecallState, type GridRecallState } from './GridDispatch';
import React from 'react';
import GridLevelStart from './game/GridLevelStart';
import GridScoreboard from './game/GridScoreboard';
import CenteredFlexBox from '../../shared/CenteredFlexBox';
import ButtonGrid from './game/ButtonGrid';

const GameGrid: React.FC<{
    endGame: (state: GridRecallState) => void
}> = ({endGame}) => {
    const theme = useTheme();

    const [gameState, gameDispatch] = useReducer(GridRecallReducer, inititalGridRecallState);

    const [levelStarted, setLevelStarted] = useState<boolean>(false);

    if(!levelStarted){
        return (
            <GridLevelStart level={gameState.level} startLevel={() => setLevelStarted(true)} 
                missesLeft={gameState.missesLeft}/>
        )
    }

    return (
        <CenteredFlexBox displayDirection="column">
            <GridScoreboard level={gameState.level} livesLeft={gameState.missesLeft}/>
            <ButtonGrid level={gameState.level} livesLeft={gameState.missesLeft}/>
        </CenteredFlexBox>
    )
}

export default GameGrid;