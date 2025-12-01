export const GRID_RECALL_ALLOWED_MISSES = 10;
export const MAX_GRID_WIDTH: number = 6;
export const MAX_BUTTON_FLASH_COUNT = 15;
export const MIN_FLASH_TIME = 600;

export interface GridLevelProperties {
    gridWidth: number,
    gridButtonCount: number,
    buttonFlashMillis: number,
    buttonFlashCount: number
}

export const GridRecallRules: Record<number | "MAX", GridLevelProperties> = {
    1: {gridWidth: 3, gridButtonCount: 9, buttonFlashMillis: 1250, buttonFlashCount: 3},
    2: {gridWidth: 3, gridButtonCount: 9, buttonFlashMillis: 1250, buttonFlashCount: 3},
    3: {gridWidth: 3, gridButtonCount: 9, buttonFlashMillis: 1250, buttonFlashCount: 4},
    4: {gridWidth: 3, gridButtonCount: 9, buttonFlashMillis: 1250, buttonFlashCount: 4},
    5: {gridWidth: 3, gridButtonCount: 9, buttonFlashMillis: 1200, buttonFlashCount: 5},

    6: {gridWidth: 4, gridButtonCount: 16, buttonFlashMillis: 1200, buttonFlashCount: 5},
    7: {gridWidth: 4, gridButtonCount: 16, buttonFlashMillis: 1150, buttonFlashCount: 6},
    8: {gridWidth: 4, gridButtonCount: 16, buttonFlashMillis: 1100, buttonFlashCount: 7},
    9: {gridWidth: 4, gridButtonCount: 16, buttonFlashMillis: 1050, buttonFlashCount: 7},
    10: {gridWidth: 4, gridButtonCount: 25, buttonFlashMillis: 1000, buttonFlashCount: 8},

    11: {gridWidth: 5, gridButtonCount: 25, buttonFlashMillis: 1000, buttonFlashCount: 9},
    12: {gridWidth: 5, gridButtonCount: 25, buttonFlashMillis: 950, buttonFlashCount: 9},
    13: {gridWidth: 5, gridButtonCount: 25, buttonFlashMillis: 900, buttonFlashCount: 10},
    14: {gridWidth: 5, gridButtonCount: 25, buttonFlashMillis: 850, buttonFlashCount: 10},
    15: {gridWidth: 5, gridButtonCount: 25, buttonFlashMillis: 800, buttonFlashCount: 11},
    16: {gridWidth: 6, gridButtonCount: 36, buttonFlashMillis: 800, buttonFlashCount: 11},
    17: {gridWidth: 6, gridButtonCount: 36, buttonFlashMillis: 750, buttonFlashCount: 11},
    18: {gridWidth: 6, gridButtonCount: 36, buttonFlashMillis: 700, buttonFlashCount: 12},
    19: {gridWidth: 6, gridButtonCount: 36, buttonFlashMillis: 700, buttonFlashCount: 12},
    20: {gridWidth: 6, gridButtonCount: 36, buttonFlashMillis: 650, buttonFlashCount: 12},
    21: {gridWidth: 6, gridButtonCount: 36, buttonFlashMillis: 600, buttonFlashCount: 13},
    22: {gridWidth: 6, gridButtonCount: 36, buttonFlashMillis: 550, buttonFlashCount: 13},
    23: {gridWidth: 6, gridButtonCount: 36, buttonFlashMillis: 500, buttonFlashCount: 13},
    24: {gridWidth: 6, gridButtonCount: 36, buttonFlashMillis: 450, buttonFlashCount: 14},
    25: {gridWidth: 6, gridButtonCount: 36, buttonFlashMillis: 400, buttonFlashCount: 14},

    "MAX": {gridWidth: MAX_GRID_WIDTH, gridButtonCount: MAX_GRID_WIDTH * MAX_GRID_WIDTH, 
        buttonFlashMillis: MIN_FLASH_TIME, buttonFlashCount: MAX_BUTTON_FLASH_COUNT},
};

export function findGridLevelProperties(level: number){
    return GridRecallRules[level] ?? GridRecallRules["MAX"];
}
