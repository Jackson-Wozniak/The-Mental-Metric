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
    handleGuess: (buttonId: number, isCorrect: boolean, timestamp: number) => void,
    completeLevel: () => void,
    beginLevelTracking: (timestamp: number) => void
}> = ({level, handleGuess, completeLevel, beginLevelTracking}) => {
    const [width, _] = useState(findGridLevelProperties(level).gridWidth);

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
            setButtonsInfo(buttons.map(b => ({
                ...b,
                currentState: ButtonState.NONE
            })));
            setTimerRunning(false);
            beginLevelTracking(Date.now());
        }, properties.buttonFlashMillis);

        return () => clearTimeout(timer);
    }, [level]);

    function generateButtons(properties: GridLevelProperties){
        const flashesLeft = properties.buttonFlashCount;
        const flashedButtonIds = new Set<number>();

        for(let i = 0 ; i < flashesLeft; i++){
            const index = getRandomNumber(0, properties.gridWidth * properties.gridWidth);
            if(flashedButtonIds.has(index)){
                i--;
                continue;
            }
            flashedButtonIds.add(index);
        }

        let createdButtons: GridButtonInfo[] = [];
        for(let i = 0 ; i < properties.gridWidth * properties.gridWidth; i++){
            const didFlash: boolean = flashedButtonIds.has(i);
            const state: ButtonState = didFlash ? ButtonState.FLASHED : ButtonState.NONE;
            createdButtons.push({
                id: i,
                currentState: state,
                didFlashThisLevel: didFlash
            });
        }
        return createdButtons;
    }

    function handleButtonClick(id: number){
        //ignore presses before level starts and buttons are set
        if(timerRunning) return;
        const timestamp = Date.now();

        let result: "correct" | "incorrect" | null = null;

        setButtonsInfo(prev => {
            const next = [...prev];
            const button = next[id];
            if(!button) return prev;

            //correct guess
            if(button.didFlashThisLevel){
                if (button.currentState === ButtonState.GUESSED_CORRECT) return prev; //no duplicate correct
                next[id] = { ...button, currentState: ButtonState.GUESSED_CORRECT };
                result = "correct";
            }else{
                //incorrect guess
                if(button.currentState == ButtonState.GUESSES_INCORRECT) return prev; //no duplicate incorrect
                next[id] = { ...button, currentState: ButtonState.GUESSES_INCORRECT };
                result = "incorrect";
            }
        
            return next;
        });

        if(result == null) return;

        handleGuess(id, result === "correct", timestamp);

        if(result === "correct"){
            if(correctGuessesLeft <= 1){
                completeLevel();
            }else{
                setCorrectGuessesLeft(correctGuessesLeft - 1)
            }
        }
    }
    
    return (
        <Box
            sx={{
                aspectRatio: "1 / 1",
                display: "grid",
                gridTemplateColumns: `repeat(${width}, 1fr)`,
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