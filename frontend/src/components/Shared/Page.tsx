import { Box, useTheme } from '@mui/material';
import Header from './Header';
import ContentContainer from './ContentContainer';

const Page: React.FC<{
    children: React.ReactNode
}> = ({children}) => {
    const theme = useTheme();

    return (
        <Box width="100%" height="100%" margin={0} padding={0}>
            <Header/>
            <ContentContainer>{children}</ContentContainer>
            <Box height="4%" width="100%" sx={{backgroundColor: theme.palette.background.primary}}></Box>
        </Box>
    )
}

export default Page;