import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Game } from "../../types/GameInfo";
import { Button, Divider, IconButton, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';

const GameCard: React.FC<{
    game: Game,
    timesPlayed: number
}> = ({game, timesPlayed}) => {
    const theme = useTheme();

    return (
        <Box 
            sx={{
                display: "flex", flexDirection: "column", justifyContent: "flex-start",
                backgroundColor: theme.palette.background.secondary, textAlign: "center", 
                width: "40%", borderRadius: "10px", minHeight: "220px", alignItems: "center"
            }}>
            <Box width="100%" display="flex" alignItems="center" marginBottom="1">
                <IconButton sx={{marginRight: 1, width: "12%"}}><InfoOutlineIcon/></IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center", width: "76%" }} color="textPrimary">
                    {game.name}
                </Typography>
                <Box width="12%"></Box>
            </Box>
            
            <Divider sx={{width: "80%", height: "3px", marginBottom: 1}}/>

            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "flex-start", 
                justifyContent: "center", textAlign: "center", width: "60%", marginTop: "15px" }}>
                <Typography variant="body2" color="textSecondary">
                    {game.description}
                </Typography>
            </Box>

            <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                <Typography color="textSecondary" sx={{display: "flex", justifyContent: "flex-start", ml: "15px"}}>{timesPlayed} times played</Typography>
                <Button component={Link} to={game.link} color="primary" 
                variant="contained" endIcon={<SendIcon/>} sx={{display: "flex", justifyContent: "flex-end", margin: "0px 10px 10px 0px"}}>
                    Play
                </Button>
            </Box>
        </Box>
    )
}

export default GameCard;