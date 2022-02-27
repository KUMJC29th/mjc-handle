import { GameManagerAction } from "./gameManagerAction";

export type GameManagerState = {
    readonly index: number;
    readonly gameIsDone: boolean;
};

const initialState: GameManagerState = {
    index: 0,
    gameIsDone: false
};

export const gameManagerReducer = (state: GameManagerState = initialState, action: GameManagerAction) => {
    switch (action.type) {
        case "nextIndex":
            return {
                ...state,
                index: state.index + 1
            };
        case "setGameIsDone":
            return {
                ...state,
                gameIsDone: true
            };
        case "resetGameManager":
            return {
                index: 0,
                gameIsDone: false
            };
        default: return state;
    }
};