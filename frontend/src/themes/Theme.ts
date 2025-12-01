import { createTheme, type Theme } from "@mui/material/styles";
import "@mui/material/styles";

export const LightTheme = (displayType: 'desktop' | 'mobile' = 'desktop',
    width: number = 0, height: number = 0
): Theme => createTheme({
    palette : {
        primary: {
            main: "#0070c0",
            contrastText: "#ffffffff"
        },
        secondary: {
            main: "#e2ee15",
            contrastText: "#272727ff"
        },
        mode: 'light',
        background : {
            primary: "white",
            secondary: "whitesmoke",
            accent: "grey"
        },
        text: {
            primary: "#000000",
            secondary: "#3d3d3d"
        }
    },
    display: displayType,
    width: width,
    height: height
});

export const DarkTheme = (displayType: 'desktop' | 'mobile' = 'desktop', 
    width: number = 0, height: number = 0
): Theme => createTheme({
    palette : {
        primary: {
            main: "#51a1daff",
            contrastText: "#ffffff"
        },
        secondary: {
            main: "#e2ee15",
            contrastText: "#797979"
        },
        mode: 'dark',
        background : {
            primary: "#0d1117",
            secondary: "#151b23",
            accent: "#2e2e2e"
        },
        text: {
            primary: "#ffffff",
            secondary: "#d0d0d0ff"
        }
    },
    display: displayType,
    width: width,
    height: height
});