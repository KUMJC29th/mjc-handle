import React, { Dispatch } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AnswerTile } from "../answers/answersReducer";
import CloseButton from "../buttons/closeButton";
import GoToNextProblemButton from "../buttons/goToNextProblemButton";
import { calcAnswerColumnTileX, layoutConstant } from "../common/layoutConstant";
import { StoreType } from "../common/store";
import StatsGraph from "../stats/statsGraph";
import StatsTable from "../stats/statsTable";
import { OverlayAction } from "./overlayAction";
import { OverlayBase } from "./overlayBase";

const Header = styled.h1`
    margin: 5px 0;
    font-size: 1.5em;
    font-weight: bold;
`;

const HeaderContainer = styled.div`
    text-align: center;
`;

const Container = styled(OverlayBase)`
    background-color: white;
    width: 80%;
    max-width: 650px;
    margin: 0 auto;
`;

const CorrectAnswerContainer = styled.div`
    padding: 5px;
    max-width: 600px;
    margin: 0 auto;
`;

const CloseButtonContainer = styled.div`
    position: absolute;
    top: 7px;
    right: 10px;
`;

const GoToNextProblemButtonContainer = styled.div`
    padding: 5px;
    width: 100%;
    text-align: center;
`;

const ResultWindow = () => {
    const index = useSelector<StoreType, number>(state => state.gameManagerReducer.index);
    const answerHand = useSelector<StoreType, readonly AnswerTile[]>(state => state.answersReducer.answers[index].tiles, shallowEqual);
    const problemHand = useSelector<StoreType, readonly number[]>(state => state.problemReducer.hand, shallowEqual);
    const gameIsDone = useSelector<StoreType, boolean>(state => state.gameManagerReducer.gameIsDone);
    
    const overlayDispaych = useDispatch<Dispatch<OverlayAction>>();
    const closeWindow = () => { overlayDispaych({ type: "setShowsResultWindow", payload: { value: false } }) };

    return (
        <Container>
            {gameIsDone && (answerHand.every(t => t.color === "hit") ? (
                <HeaderContainer>
                    <Header>正解！</Header>
                </HeaderContainer>
            ) : (
                <>
                    <HeaderContainer>
                        <Header>不正解…</Header>
                    </HeaderContainer>
                    <CorrectAnswerContainer>
                        <div>正解は</div>
                        <div>
                            <svg
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox={layoutConstant.answerCoulumnViewBox}
                            >
                                {problemHand.map((t, i) => 
                                    <g key={`tile_fore_${i}`}>
                                        <use
                                            xlinkHref={`tiles.svg#tile_none`}
                                            x={calcAnswerColumnTileX(i)}
                                            y={layoutConstant.tileHeight / 2}
                                        />
                                        <use
                                            xlinkHref={`tiles.svg#tile${t}`}
                                            x={calcAnswerColumnTileX(i)}
                                            y={layoutConstant.tileHeight / 2}
                                        />
                                    </g>
                                )}
                            </svg>
                        </div>
                    </CorrectAnswerContainer>
                </>
            ))}
            <StatsTable />
            <StatsGraph />
            {gameIsDone &&
                <GoToNextProblemButtonContainer>
                    <GoToNextProblemButton />
                </GoToNextProblemButtonContainer>
            }
            <CloseButtonContainer>
                <CloseButton
                    onClick={closeWindow}
                />
            </CloseButtonContainer>
        </Container>
    );
};

export default ResultWindow;