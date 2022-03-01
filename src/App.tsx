import React from 'react';
import styled from 'styled-components';
import AnswerColumn from './answers/answerColumn';
import EnterButton from './buttons/enterButton';
import ProblemInfo from './problems/problemInfo';
import TilePalette from './tilePalette/tilePalette';
import { enumerateRange } from './common/util';
import InvalidHandMessage from './overlay/invalidHandMessage';
import { useSelector } from 'react-redux';
import { StoreType } from './common/store';
import { CSSTransition } from "react-transition-group";
import ResultWindow from './overlay/resultWindow';
import { fadeBase } from './overlay/fadeBase';
import ShowResultsButton from './buttons/showResultsButton';

const TitleContainer = styled.div`
    border-bottom: solid 1px black;
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
    padding: 5px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PageTitle = styled.h1`
    user-select: none;
    margin: 0;
`;

const ShowResultsButtonContainer = styled.div`
    position: absolute;
    top: 5px;
    right: 10px;
`;

const AnswerColumnsContainer = styled.div`
    padding: 5px;
`;

const ContentButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 5px 0 15px 0;
`;

const MainContainer = styled.div`
    
`;

const OverlayCover = styled.div`
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    ${fadeBase}
`;

function App() {
    const showsInvalidHandMessage = useSelector<StoreType, boolean>(state => state.overlayReducer.showsInvalidHandMessage);
    const showsResultwindow = useSelector<StoreType, boolean>(state => state.overlayReducer.showsResultWindow);

    return (
        <>
            <TitleContainer>
                <PageTitle>MJC Handle</PageTitle>
                <ShowResultsButtonContainer>
                    <ShowResultsButton />
                </ShowResultsButtonContainer>
            </TitleContainer>
            <ProblemInfo />
            <AnswerColumnsContainer>
                {enumerateRange(0, 6).map(i => 
                    <AnswerColumn index={i} key={`column${i}`} />
                )}
            </AnswerColumnsContainer>
            <TilePalette />
            <ContentButtonsContainer>
                <EnterButton />
            </ContentButtonsContainer>
            <CSSTransition
                in={showsInvalidHandMessage}
                timeout={2000}
                unmountOnExit={true}
                classNames="fade"
            >
                <InvalidHandMessage />
            </CSSTransition>
            <CSSTransition
                in={showsResultwindow}
                timeout={500}
                unmountOnExit={true}
                classNames="fade"
            >
                <OverlayCover>
                    <ResultWindow />
                </OverlayCover>
            </CSSTransition>
        </>
    );
}

export default App;
