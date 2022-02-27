import { createStore, combineReducers } from "redux";
import { answersReducer } from "../answers/answersReducer";
import { tilePaletteReducer } from "../tilePalette/tilePaletteReducer";
import { problemReducer } from "../problems/problemReducer";
import { gameManagerReducer } from "../gameManager/gameManagerReducer";
import { overlayReducer } from "../overlay/overlayReducer";
import { statsReducer } from "../stats/statsReducer";

const rootReducer = combineReducers({
    answersReducer,
    tilePaletteReducer,
    problemReducer,
    gameManagerReducer,
    overlayReducer,
    statsReducer
});

export const store = createStore(rootReducer);

export type StoreType = ReturnType<typeof store.getState>;