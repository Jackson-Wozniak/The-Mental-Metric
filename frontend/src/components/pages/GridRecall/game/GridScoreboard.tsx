import Typography from "@mui/material/Typography";
import { GRID_RECALL_ALLOWED_MISSES } from "../../../../config/GridRecallConstants";
import CenteredFlexBox from "../../../shared/CenteredFlexBox";

const GridScoreboard: React.FC<{
    level: number,
    livesLeft: number,
}> = ({level, livesLeft}) => {
    return (
        <CenteredFlexBox sx={{height: "10%"}}>
            <Typography color="textPrimary" variant="h5" marginRight={10}>Level {level}</Typography>
            <Typography color="textPrimary" variant="body1">{livesLeft} / {GRID_RECALL_ALLOWED_MISSES} Lives Remaining</Typography>
        </CenteredFlexBox>
    )
}

export default GridScoreboard;