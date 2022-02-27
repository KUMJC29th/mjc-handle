import { TileColor } from "../common/tileColor";
import { AnswersAction } from "./answersAction";

export type AnswerTile = {
    readonly tile: number;
    readonly color: TileColor;
};

export type AnswerStateColumn = {
    readonly tiles: readonly AnswerTile[];
}

export type AnswersState = {
    readonly answers: readonly AnswerStateColumn[];
};

function createBlankAnswer(): AnswersState {
    return {
        answers: new Array(6).fill(0).map(_ => ({ tiles: [] }))
    };
}

export const answersReducer = (state: AnswersState = createBlankAnswer(), action: AnswersAction): AnswersState => {
    switch (action.type) {
        case "addAnswer": 
            return {
                answers: state.answers.map((ans, i) => i === action.payload.index && ans.tiles.length < 14 && ans.tiles.filter(t => t.tile === action.payload.tile).length < 4
                    ? ({
                        tiles: [...ans.tiles, { tile: action.payload.tile, color: "none" }]
                    })
                    : ans
                )
            };
        case "removeAnswer":
            return {
                answers: state.answers.map((ans, i) => i === action.payload.index && ans.tiles.length > 0
                    ? ({
                        tiles: ans.tiles.slice(0, -1)
                    })
                    : ans)
            };
        case "paintAnswer":
            return {
                answers: state.answers.map((ans, i) => i === action.payload.index
                    ? ({
                        tiles: action.payload.colors.map((color, j) => ({
                            tile: ans.tiles[j].tile,
                            color
                        }))
                    })
                    : ans)
            };
        case "clearAnswer":
            return createBlankAnswer();
        default: return state; // 初回の呼び出しのために必要
    }
};