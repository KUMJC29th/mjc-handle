type OverlayActionInvalidHand = {
    readonly type: "setShowsInvalidHandMessage";
    readonly payload: {
        readonly value: boolean;
        readonly timerId: number | null;
    };
};

type OverlayActionResultWindow = {
    readonly type: "setShowsResultWindow";
    readonly payload: {
        readonly value: boolean;
    };
};

export type OverlayAction = OverlayActionInvalidHand | OverlayActionResultWindow;