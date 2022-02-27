import { TileColor } from "../common/tileColor";

type AnswersActionAdd = {
    readonly type: "addAnswer";
    readonly payload: {
        readonly index: number;
        readonly tile: number;
    };
};

type AnswersActionRemove = {
    readonly type: "removeAnswer";
    readonly payload: {
        readonly index: number;
    };
};

type AnswersActionPaint = {
    readonly type: "paintAnswer";
    readonly payload: {
        readonly index: number;
        readonly colors: readonly TileColor[];
    }
};

type AnswersActionClear = {
    readonly type: "clearAnswer";
}

export type AnswersAction = AnswersActionAdd | AnswersActionRemove | AnswersActionPaint | AnswersActionClear;