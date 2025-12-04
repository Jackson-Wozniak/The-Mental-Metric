import Button from "@mui/material/Button";
import { ButtonState, type GridButtonInfo } from "./ButtonGrid";
import { useTheme } from "@mui/material";

const GridButton: React.FC<{
    info: GridButtonInfo,
    handleButtonClick: (id: number) => void
}> = ({info, handleButtonClick}) => {
    const theme = useTheme();

    function getBackgroundColor(state: ButtonState){
        if(state == ButtonState.FLASHED) return theme.gridRecall.gridButton.flashed;
        if(state == ButtonState.GUESSED_CORRECT) return theme.gridRecall.gridButton.correct;
        if(state == ButtonState.GUESSES_INCORRECT) return theme.gridRecall.gridButton.incorrect;
        return theme.gridRecall.gridButton.none;
    }

    return (
        <Button key={info.id} onClick={() => handleButtonClick(info.id)}
            sx={{height: "100%", aspectRatio: "1 / 1", border: "1px solid black", background: 
            getBackgroundColor(info.currentState), color: "white"}}>
        </Button>
    )
}

export default GridButton;