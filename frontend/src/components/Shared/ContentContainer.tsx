import type React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

const ContentContainer: React.FC<{
    children?: React.ReactNode
}> = ({children}) => {
    const theme = useTheme();

    return (
        <Box width="100%" minHeight="86%" margin={0} padding={0} boxSizing="content-box" 
            display="flex" flexDirection="column" overflow="auto"
            sx={{backgroundColor: theme.palette.background.primary}}>
            {children}
        </Box>
    )
}

export default ContentContainer;