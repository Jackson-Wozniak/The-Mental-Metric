import { useEffect, useState } from "react";
import { findGridLevelProperties, MAX_GRID_WIDTH, type GridLevelProperties } from "../../../../config/GridRecallConstants";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import GridButton from "./GridButton";

const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
}

export enum ButtonState {
    NONE = 0,
    FLASHED = 1,
    GUESSED_CORRECT = 2,
    GUESSES_INCORRECT = 3,
}

export interface GridButtonInfo {
    id: number,
    currentState: ButtonState,
    didFlashThisLevel: boolean
}

const ButtonGrid: React.FC<{
    level: number,
    livesLeft: number,
    handleGuess: (isCorrect: boolean) => void,
    completeLevel: () => void
}> = ({level, handleGuess, completeLevel}) => {
    const theme = useTheme();

    const [buttonsInfo, setButtonsInfo] = useState<GridButtonInfo[]>([]);
    const [timerRunning, setTimerRunning] = useState(true);
    const [correctGuessesLeft, setCorrectGuessesLeft] = useState<number>(0);

    useEffect(() => {
        const properties: GridLevelProperties = findGridLevelProperties(level);
        setCorrectGuessesLeft(properties.buttonFlashCount);

        let buttons: GridButtonInfo[] = generateButtons(properties);
        setButtonsInfo([...buttons]);
        setTimerRunning(true);

        const timer = setTimeout(() => {
            buttons.forEach(b => b.currentState = ButtonState.NONE);
            setButtonsInfo([...buttons]);
            setTimerRunning(false);
        }, properties.buttonFlashMillis);

        return () => clearTimeout(timer);
    }, []);

    function generateButtons(properties: GridLevelProperties){
        const flashesLeft = properties.buttonFlashCount;
        const flashedButtonIds: number[] = [];

        for(let i = 0 ; i < flashesLeft; i++){
            const row = getRandomNumber(0, properties.gridWidth);
            const col = getRandomNumber(0, properties.gridWidth);
            const index = (row * MAX_GRID_WIDTH) + col;
            if(flashedButtonIds.includes(index)){
                i--;
                continue;
            }
            flashedButtonIds.push(index);
        }

        let createdButtons: GridButtonInfo[] = [];
        for(let i = 0 ; i < properties.gridWidth; i++){
            for(let j = 0; j < properties.gridWidth; j++){
                const index = (i * MAX_GRID_WIDTH) + j;
                const didFlash: boolean = flashedButtonIds.includes(index);
                const state: ButtonState = didFlash ? ButtonState.FLASHED : ButtonState.NONE;
                createdButtons.push({
                    id: index,
                    currentState: state,
                    didFlashThisLevel: didFlash
                });
            }
        }
        return createdButtons;
    }

    function handleButtonClick(id: number){
        //ignore presses before level starts and buttons are set
        if(timerRunning) return;

        const buttonsCopy = [...buttonsInfo];
        
        buttonsCopy.forEach((button: GridButtonInfo) => {
            if(button.id != id) return;

            //correct guess
            if(button.didFlashThisLevel){
                if(button.currentState == ButtonState.GUESSED_CORRECT) return; //no duplicate correct
                button.currentState = ButtonState.GUESSED_CORRECT;
                handleGuess(true);
                if(correctGuessesLeft <= 1){
                    completeLevel();
                    return;
                }
                setCorrectGuessesLeft(correctGuessesLeft - 1);
                return;
            }

            //incorrect guess
            if(button.currentState == ButtonState.GUESSES_INCORRECT) return; //no duplicate incorrect
            button.currentState = ButtonState.GUESSES_INCORRECT;
            handleGuess(false);
        });

        setButtonsInfo([...buttonsCopy]);
    }
    
    return (
        <Box
            sx={{
                aspectRatio: "1 / 1",
                display: "grid",
                gridTemplateColumns: `repeat(${findGridLevelProperties(level).gridWidth}, 1fr)`,
                width: Math.min(theme.width, theme.height) * .75, 
                height: Math.min(theme.width, theme.height) * .75,
                marginBottom: "15px"
            }}
        >{buttonsInfo.map((button: GridButtonInfo) => {
            return <GridButton key={button.id} info={button} handleButtonClick={() => handleButtonClick(button.id)}/>
        })}</Box>
    )
}

export default ButtonGrid;