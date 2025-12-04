
export interface GridRecallState {
    level: number,
}

export const inititalGridRecallState = {
    level: 1,
}

type GridRecallAction = 
    | { type: "IncrementLevel" }

export const GridRecallReducer = (state: GridRecallState, action: GridRecallAction) => {
    switch(action.type){
        case "IncrementLevel": return {
            ...state,
            level: state.level + 1
        }
    }
}