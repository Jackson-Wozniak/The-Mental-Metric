import Button from "@mui/material/Button";
import { ButtonState, type GridButtonInfo } from "./ButtonGrid";

function getBackgroundColor(state: ButtonState){
    if(state == ButtonState.FLASHED) return "#ffffffff";
    if(state == ButtonState.GUESSED_CORRECT) return "#285523ff";
    if(state == ButtonState.GUESSES_INCORRECT) return "#d34a4aff";
    return "#4559cbff";
}

const GridButton: React.FC<{
    info: GridButtonInfo,
    handleButtonClick: (id: number) => void
}> = ({info, handleButtonClick}) => {

    return (
        <Button key={info.id} onClick={() => handleButtonClick(info.id)}
            sx={{height: "100%", aspectRatio: "1 / 1", border: "1px solid black", background: 
            getBackgroundColor(info.currentState), color: "white"}}>
        </Button>
    )
}

export default GridButton;