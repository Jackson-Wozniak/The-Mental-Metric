import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage/HomePage";
import GridRecallPage from "./components/pages/GridRecall/GridRecallPage";
import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { DarkTheme, LightTheme } from "./themes/Theme";

interface ModeContextType {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);
export const useThemeContext = () => useContext(ModeContext);

const AppInitializer: React.FC = () => {
    const [mode, setMode] = useState<"light" | "dark">('dark');
    const [displayType, setDisplayType] = useState<'desktop' | 'mobile'>();
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
            setDisplayType(window.innerWidth < window.innerHeight ? 'mobile' : 'desktop');
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

	return (
		<ModeContext.Provider value={{mode, setMode}}>
            <ThemeProvider theme={mode === 'light' ? LightTheme(displayType, width, height) : DarkTheme(displayType, width, height)}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<HomePage/>} />
                    <Route path="GridRecall" element={<GridRecallPage/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
        </ModeContext.Provider>
	)
}

export default AppInitializer;