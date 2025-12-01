
export interface Game {
    name: string,
    link: string,
    description: string
}

export const Games: Game[] = [
    {name: "Grid Recall", link: "/GridRecall", description: "Can you recall buttons on the grid?"},
    {name: "Peripheral Focus", link: "/PeripheralFocus", description: "Can you use your peripheral vision?"},
    {name: "Selective Attention", link: "/SelectiveAttention", description: "Can you filter incoming info?"},
    {name: "Word Link", link: "/WordLink", description: "Can you match the word pairs out of order?"}
]
