import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CenteredFullWindow } from "../../../styles/Shared";
import { GRID_RECALL_ALLOWED_MISSES } from "../../../utils/GridRecall/GridRecallProperties";


const GridScoreboard: React.FC<{
    level: number,
    livesLeft: number,
}> = ({level, livesLeft}) => {
    return (
        <Box width="100%" height="10%" sx={CenteredFullWindow("row")}>
            <Typography color="textPrimary" variant="h5" marginRight={10}>Level {level}</Typography>
            <Typography color="textPrimary" variant="body1">{livesLeft} / {GRID_RECALL_ALLOWED_MISSES} Lives Remaining</Typography>
        </Box>
    )
}

export default GridScoreboard;