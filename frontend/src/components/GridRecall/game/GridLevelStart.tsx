import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { GRID_RECALL_ALLOWED_MISSES } from "../../../utils/GridRecall/GridRecallProperties";
import { CenteredFullWindow } from "../../../styles/Shared";
import { Box, Stack, useTheme } from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";


const GridLevelStart: React.FC<{
    level: number,
    startLevel: () => void,
    missesLeft: number
}> = ({level, startLevel, missesLeft}) => {
    const theme = useTheme();

    return (
        <Box sx={CenteredFullWindow()}>
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
        </Box>
    )
}

export default GridLevelStart;