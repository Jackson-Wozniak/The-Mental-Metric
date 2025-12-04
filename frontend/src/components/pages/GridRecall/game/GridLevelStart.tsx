import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { GRID_RECALL_ALLOWED_MISSES } from "../../../../config/GridRecallConstants";
import { Stack, useTheme } from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import CenteredFlexBox from "../../../shared/CenteredFlexBox";

const GridLevelStart: React.FC<{
    level: number,
    startLevel: () => void,
    missesLeft: number
}> = ({level, startLevel, missesLeft}) => {
    const theme = useTheme();

    return (
        <CenteredFlexBox displayDirection="column">
            <Typography variant="h3" color="textPrimary">Level {level}</Typography>
            <br/>
            <Stack width="100%" display="flex" justifyContent="center" alignItems="center" direction="row">
                {Array.from({ length: GRID_RECALL_ALLOWED_MISSES }).map((_: any, index: number) => {
                    return <Favorite
                        key={index}
                        style={{
                            color: index < missesLeft ? 'red' : theme.palette.text.secondary
                        }}
                    />
                })}
            </Stack>
            <br/>
            <Button onClick={startLevel} variant="contained" color="primary">Start</Button>
        </CenteredFlexBox>
    )
}

export default GridLevelStart;