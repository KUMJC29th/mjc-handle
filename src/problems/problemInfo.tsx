import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { StoreType } from "../common/store";
import { layoutConstant } from "../common/layoutConstant";
import { ProblemState } from "./problemReducer";

const Conatiner = styled.div`
    height: ${layoutConstant.problemInfoTileHeight}px;
    display: table;
    margin: 5px auto;
`;

const ItemContainer = styled.div`
    height: 100%;
    display: table-cell;
    vertical-align: middle;
    user-select: none;
`;

const ItemContainerTile = styled(ItemContainer)`
    width: 5vw;
    max-width: 40px;
`;

type ItemContainerPadding = {
    readonly horizontal?: number;
};
const ItemContainerWithPadding = styled(ItemContainer)<ItemContainerPadding>`
    padding: 0px ${props => props.horizontal ?? 5}px;
`;

const ProblemInfo = () => {
    const { problemNumber, roundWind, seatWind, isBySelfDraw } = useSelector<StoreType, ProblemState>(state => state.problemReducer);
    return (
        <Conatiner>
            <ItemContainer>No. {problemNumber + 1}</ItemContainer>
            <ItemContainerWithPadding></ItemContainerWithPadding>
            <ItemContainer>場風： </ItemContainer>
            <ItemContainerTile>
                <svg
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={layoutConstant.problemInfoTileViewBox}
                >
                    <use xlinkHref="tiles.svg#tile_none" />
                    <use xlinkHref={`tiles.svg#tile${27 + roundWind}`} />
                </svg>
            </ItemContainerTile>
            <ItemContainerWithPadding> / </ItemContainerWithPadding>
            <ItemContainer>自風： </ItemContainer>
            <ItemContainerTile>
                <svg
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={layoutConstant.problemInfoTileViewBox}
                >
                    <use xlinkHref="tiles.svg#tile_none" />
                    <use xlinkHref={`tiles.svg#tile${27 + seatWind}`} />
                </svg>
            </ItemContainerTile>
            <ItemContainerWithPadding> / </ItemContainerWithPadding>
            <ItemContainer>{isBySelfDraw ? "ツモ" : "ロン"}</ItemContainer>
        </Conatiner>
    );
};

export default ProblemInfo;