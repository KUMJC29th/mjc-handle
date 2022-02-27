type GameManagerActionNextIndex = {
    readonly type: "nextIndex";
};

type GameManagerActionGameIsDone = {
    readonly type: "setGameIsDone";
};

type GameManagerActionReset = {
    readonly type: "resetGameManager";
};

export type GameManagerAction = GameManagerActionNextIndex | GameManagerActionGameIsDone | GameManagerActionReset;