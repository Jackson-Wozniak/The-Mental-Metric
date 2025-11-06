import type React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const ContentContainer: React.FC<{
    children?: React.ReactNode
}> = ({children}) => {
    const theme = useTheme();

    return (
        <Box width="100%" height="90%" marginBottom="20px" boxSizing="content-box" 
            display="flex" flexDirection="column"
            sx={{backgroundColor: theme.palette.background.primary}}>
            <Box height="98%" overflow="auto">
                {children}
            </Box>
            <Box height="2%" width="100%"></Box>
        </Box>
    )
}

export default ContentContainer;