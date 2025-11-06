import Box from "@mui/material/Box";
import { Games, type Game } from "../../types/GameInfo";
import ContentContainer from "../Shared/ContentContainer";
import GameCard from "./GameCard";
import type { GameSessionRecord } from "../../types/Game";
import { Typography, Divider, Stack, useTheme } from "@mui/material";
import type React from "react";

const testRecords: GameSessionRecord[] = [
    {game: "Grid Recall", score: 12, timePlayed: new Date()},
    {game: "Peripheral Focus", score: 9, timePlayed: new Date(2025, 1, 5)},
    {game: "Grid Recall", score: 12, timePlayed: new Date()},
    {game: "Selective Attention", score: 12, timePlayed: new Date()},
    {game: "Word Link", score: 16, timePlayed: new Date(2025, 9, 5)},
    {game: "Grid Recall", score: 4, timePlayed: new Date()},
    {game: "Grid Recall", score: 12, timePlayed: new Date()},
    {game: "Peripheral Focus", score: 9, timePlayed: new Date(2025, 1, 5)},
    {game: "Grid Recall", score: 12, timePlayed: new Date()},
    {game: "Selective Attention", score: 12, timePlayed: new Date()},
    {game: "Word Link", score: 16, timePlayed: new Date(2025, 9, 5)},
    {game: "Grid Recall", score: 4, timePlayed: new Date()},
    {game: "Grid Recall", score: 12, timePlayed: new Date()},
    {game: "Peripheral Focus", score: 9, timePlayed: new Date(2025, 1, 5)},
    {game: "Grid Recall", score: 12, timePlayed: new Date()},
    {game: "Selective Attention", score: 12, timePlayed: new Date()},
    {game: "Word Link", score: 16, timePlayed: new Date(2025, 9, 5)},
    {game: "Grid Recall", score: 4, timePlayed: new Date()},
    {game: "Grid Recall", score: 12, timePlayed: new Date()},
    {game: "Peripheral Focus", score: 9, timePlayed: new Date(2025, 1, 5)},
    {game: "Grid Recall", score: 12, timePlayed: new Date()},
    {game: "Selective Attention", score: 12, timePlayed: new Date()},
    {game: "Word Link", score: 16, timePlayed: new Date(2025, 9, 5)},
    {game: "Grid Recall", score: 4, timePlayed: new Date()},
]

const SessionRecordRow: React.FC<{
    record: GameSessionRecord
}> = ({record}) => {
    return (
        <Box width="95%" display="flex" mt="5px" textAlign="center">
            <Box width="45%">
                <Typography color="textSecondary">{record.game}</Typography>
            </Box>
            <Box width="15%">
                <Typography color="textSecondary">{record.score}</Typography>
            </Box>
            <Box width="40%">
                <Typography color="textSecondary">{record.timePlayed.toLocaleDateString('en-US')}</Typography>
            </Box>
        </Box>
    )
}

const HomePage: React.FC = () => {
    const theme = useTheme();

    return (
        <ContentContainer>
            <Box width="100%" height="100%" display="flex" justifyContent="center">
                <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center", 
                    gap: "40px", width: "60%", marginTop: "35px"}}>
                    {Games.map((game: Game, index: number) => {
                        return <GameCard key={index} game={game} timesPlayed={0}/>
                    })}
                </Box>
                <Box display="flex" flexDirection="column" width="35%" alignItems="center" marginTop="35px"
                    overflow="hidden"
                    sx={{
                        backgroundColor: theme.palette.background.secondary, borderRadius: "10px"
                    }}>
                    <Typography variant="h2" fontSize="25px" mt="5px" color="textPrimary">Recent Sessions</Typography>
                    <Divider sx={{width: "80%", height: "3px"}}/>
                    <Stack direction="column" display="flex" width="100%" alignItems="center" mt="5px" overflow="auto">
                        <Box width="95%" display="flex" textAlign="center" mb="5px">
                            <Box width="45%">
                                <Typography color="textPrimary" fontWeight="bold">Game</Typography>
                            </Box>
                            <Box width="15%">
                                <Typography color="textPrimary" fontWeight="bold">Score</Typography>
                            </Box>
                            <Box width="40%">
                                <Typography color="textPrimary" fontWeight="bold">Time Played</Typography>
                            </Box>
                        </Box>

                        {testRecords.map((record: GameSessionRecord) => {
                            return <SessionRecordRow record={record}/>
                        })}
                    </Stack>
                </Box>
            </Box>
        </ContentContainer>
    )
}

export default HomePage;