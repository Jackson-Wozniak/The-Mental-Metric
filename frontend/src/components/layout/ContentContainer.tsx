import type React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

const ContentContainer: React.FC<{
    children?: React.ReactNode
}> = ({children}) => {
    const theme = useTheme();

    return (
        <Box width="100%" minHeight="90%" margin={0} padding={0} boxSizing="content-box" 
            display="flex" flexDirection="column" overflow="visible"
            sx={{backgroundColor: theme.palette.background.primary}}>
            <Box sx={{ height: "100%", flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
                {children}
            </Box>
        </Box>
    )
}

export default ContentContainer;