import type { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box"

const CenteredFlexBox: React.FC<{
    children: React.ReactNode,
    displayDirection?: "row" | "column",
    sx?: SxProps<Theme>
}> = ({children, displayDirection = "row", sx = {}}) => {

    return (
        <Box sx={{
            display: "flex", flexDirection: displayDirection,
            width: "100%", height: "100%",
            alignItems: "center", justifyContent: "center",
            ...sx
        }}>{children}</Box>
    )
}

export default CenteredFlexBox;