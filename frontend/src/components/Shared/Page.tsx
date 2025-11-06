import { Box } from '@mui/material';
import Header from './Header';

const Page: React.FC<{
    component: React.ReactNode,
    setMode: (mode: 'light' | 'dark') => void
}> = ({component, setMode}) => {

    return (
        <Box width="100%" height="100%" overflow="hidden">
            <Header setMode={setMode}/>
            {component}
        </Box>
    )
}

export default Page;