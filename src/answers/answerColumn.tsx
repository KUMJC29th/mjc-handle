import React from "react";
import { useSelector } from "react-redux";
import { layoutConstant, calcAnswerColumnTileX } from "../common/layoutConstant";
import { enumerateRange } from "../common/util";
import { StoreType } from "../common/store";
import { AnswerStateColumn } from "./answersReducer";

type AnswerColumnProps = {
    readonly index: number;
};

const AnswerColumn = ({ index }: AnswerColumnProps) => {
    const answer = useSelector<StoreType, AnswerStateColumn>(state => state.answersReducer.answers[index]);
    return (
        <div>
            <svg
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
                viewBox={layoutConstant.answerCoulumnViewBox}
                height={layoutConstant.answerColumnHeight}
            >
                {enumerateRange(0, 14).map(i =>
                    <use
                        xlinkHref="tiles.svg#tile_border"
                        x={calcAnswerColumnTileX(i)}
                        y={layoutConstant.tileHeight / 2}
                        key={`tile_bg_${i}`}
                    />
                )}
                {answer.tiles.map((t, i) => 
                    <g key={`tile_fore_${i}`}>
                        <use
                            xlinkHref={`tiles.svg#tile_${t.color}`}
                            x={calcAnswerColumnTileX(i)}
                            y={layoutConstant.tileHeight / 2}
                        />
                        <use
                            xlinkHref={`tiles.svg#tile${t.tile}`}
                            x={calcAnswerColumnTileX(i)}
                            y={layoutConstant.tileHeight / 2}
                        />
                    </g>
                )}
            </svg>
        </div>
    );
};

export default AnswerColumn;