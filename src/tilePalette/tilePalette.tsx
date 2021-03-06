import React from "react";
import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AnswersAction } from "../answers/answersAction";
import { StoreType } from "../common/store";
import { TileColor } from "../common/tileColor";
import { layoutConstant } from "../common/layoutConstant";
import useMedia from "use-media";

const calcX = (index: number): number => {
    const i = index % 9;
    return (i + 0.5) * layoutConstant.tileWidth + (2 * i + 1) * layoutConstant.tileHorizontalGap;
};
const calcY = (index: number): number => {
    const j = Math.floor(index / 9);
    return (j + 0.5) * layoutConstant.tileHeight + (2 * j + 1) * layoutConstant.tileVerticalGap;
};

const Container = styled.div`
    padding: 5px;
    max-width: ${layoutConstant.answerColumnWidth}px;
    margin: 5px auto;

    
`;

const InnerContainer = styled.div`
    margin: 0 auto;
    width: 50%;

    @media screen and (max-width: ${layoutConstant.widthThreshold}px) {
        width: 75%;
    }
`;

const ClickableG = styled.g`
    cursor: pointer;
`;

const TilePalette = () => {
    const colors = useSelector<StoreType, readonly TileColor[]>(state => state.tilePaletteReducer.colors);
    const index = useSelector<StoreType, number>(state => state.gameManagerReducer.index);
    const answerDispatch = useDispatch<Dispatch<AnswersAction>>();
    const addAnswer = (tile: number) => () => answerDispatch({ type: "addAnswer", payload: { index, tile } });
    const removeAnswer = () => answerDispatch({ type: "removeAnswer", payload: { index } });

    return (
        <Container>
            <InnerContainer>
            <svg
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
                viewBox={layoutConstant.tilePaletteViewBox}
            >
                {colors.map((col, i) => 
                    <ClickableG
                        onClick={addAnswer(i)}
                        key={`palette${i}`}
                    >
                        <use
                            xlinkHref={`tiles.svg#tile_${col}`}
                            x={calcX(i)}
                            y={calcY(i)}
                        />
                        <use
                            xlinkHref={`tiles.svg#tile${i}`}
                            x={calcX(i)}
                            y={calcY(i)}
                        />
                    </ClickableG>
                )}
                <ClickableG
                    onClick={removeAnswer}
                >
                    <use
                        xlinkHref="tiles.svg#tile_backspace"
                        x={calcX(34)}
                        y={calcY(34)}
                    />
                </ClickableG>
            </svg>
            </InnerContainer>
        </Container>
    );
};

export default TilePalette;