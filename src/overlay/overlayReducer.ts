import { OverlayAction } from "./overlayAction";

export type OverlayState = {
    readonly showsInvalidHandMessage: boolean;
    readonly invalidHandMessageTimerId: number | null;
    readonly showsResultWindow: boolean;
};

const initialState: OverlayState = {
    showsInvalidHandMessage: false,
    invalidHandMessageTimerId: null,
    showsResultWindow: false,
};

export const overlayReducer = (state: OverlayState = initialState, action: OverlayAction): OverlayState => {
    switch (action.type) {
        case "setShowsInvalidHandMessage":
            return {
                ...state,
                showsInvalidHandMessage: action.payload.value,
                invalidHandMessageTimerId: action.payload.timerId
            };
        case "setShowsResultWindow":
            return {
                ...state,
                showsResultWindow: action.payload.value
            };
        default: return state;
    }
};