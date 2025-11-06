
export const CenteredFullWindow = (displayDirection: "row" | "column" = "column") => {
    return {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: displayDirection,
        justifyContent: "center"
    }
}