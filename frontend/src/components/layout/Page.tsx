import { Box, useTheme } from '@mui/material';
import Header from './Header';
import ContentContainer from './ContentContainer';

const Page: React.FC<{
    children: React.ReactNode
}> = ({children}) => {
    return (
        <Box width="100%" height="100%" margin={0} padding={0}>
            <Header/>
            <ContentContainer>
                <Box sx={{display: "flex", width: "100%", height: "100%", alignItems: "center", 
                    justifyContent: "center", flexGrow: 1
                }}>{children}</Box>
            </ContentContainer>
        </Box>
    )
}

export default Page;