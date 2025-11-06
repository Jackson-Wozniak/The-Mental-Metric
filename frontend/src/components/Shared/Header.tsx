import { Button, IconButton, MenuItem, Select, Stack, type SelectChangeEvent } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme, type Theme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LightModeIcon from '@mui/icons-material/LightMode';
import GitHubIcon from '@mui/icons-material/GitHub';
import type { HeaderEntry } from "../../types/Header";
import type React from "react";
import HomeImage from './../../assets/logo_full.png';
import { Games, type Game } from "../../types/GameInfo";

const selectStyling = (theme: Theme) => { return {
    margin: "0px 15px 0px 15px",
    boxShadow: `${theme.palette.text.secondary} 0px 0px 0px 1px`,
    borderColor: "text.secondary",
    height: "70%", width: "auto", aspectRatio: "1 / 1",
    borderRadius: "5px", padding: "0",
    '& .MuiSelect-icon': {
        padding: "0", margin: "0",
        height: "50%", width: "50%", transform: "translate(-50%, -50%)",
        transition: "none", top: "50%", left: "50%", color: "text.primary"
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
}}

const GithubButton: React.FC = () => {
    const theme = useTheme();

    return (
        <Link to="https://github.com/Jackson-Wozniak/TheMentalMetric" target="_blank"
            style={{height: "100%", display: "flex", alignItems: "center", }}>
            <IconButton
                sx={{
                    margin: "0px 15px 0px 15px",
                    borderRadius: "5px",
                    border: "none",
                    boxShadow: `${theme.palette.text.secondary} 0px 0px 0px 1px`,
                    width: "auto",
                    height: "70%",
                    padding: "10px",
                }}
            ><GitHubIcon sx={{ height: "100%", width: "auto", color: "text.primary" }} /></IconButton>
        </Link>
    )
}

const HeaderLink: React.FC<{item: Game}> = ({item}) => {
    return (
        <Button component={Link} to={item.link} sx={{textDecoration: "none", padding: "0px 20px", color: "text.primary"}}>
            {item.name}
        </Button>
    )
}

const Header: React.FC<{
    setMode: (mode: 'light' | 'dark') => void
}> = ({setMode}) => {
    const theme = useTheme();

    function handleModeSwitch(e: SelectChangeEvent<'light' | 'dark'>){
        e.preventDefault();
        setMode(e.target.value);
    }

    if(theme.display === 'mobile'){
        return (
            <Box width="100%" height="7%" sx={{backgroundColor: theme.palette.background.secondary}}
                display="flex" justifyContent="space-between" alignItems="center"
            >
                <Link to={"/"} style={{height: "100%"}}>
                    <img src={HomeImage} height="100%" style={{width: "auto"}}/>
                </Link>

                <Select value="" IconComponent={FormatListBulletedIcon} sx={selectStyling}>
                    {Games.map((game: Game, index: number) => {
                        return (
                            <MenuItem key={index}><HeaderLink item={game}/></MenuItem>
                        )
                    })}
                </Select>

                <Box display="flex" alignItems="center" gap={2} height="100%">
                    <Select onChange={handleModeSwitch} value="" IconComponent={LightModeIcon} sx={selectStyling}>
                        <MenuItem value="light">Light</MenuItem>
                        <MenuItem value="dark">Dark</MenuItem>
                    </Select>
                    <GithubButton/>                   
                </Box>
            </Box>
        )
    }

    return (
        <Box width="100%" height="10%" sx={{backgroundColor: theme.palette.background.secondary}}
            display="flex" justifyContent="space-between" alignItems="center"
        >
            <Stack height="100%" direction="row" display="flex" justifyContent="space-evenly" gap={0}>
                <Link to={"/"} style={{height: "100%"}}>
                    <img src={HomeImage} height="100%" style={{objectFit: "contain"}}/>
                </Link>

                {Games.map((game: Game, index: number) => {
                    return (
                        <HeaderLink key={index} item={game}/>
                    )
                })}
            </Stack>
            <Box display="flex" alignItems="center" gap={2} height="100%">
                <Select onChange={handleModeSwitch} value="" IconComponent={LightModeIcon} sx={selectStyling}>
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                </Select>
                <GithubButton/>        
            </Box>
        </Box>
    )
}

export default Header;