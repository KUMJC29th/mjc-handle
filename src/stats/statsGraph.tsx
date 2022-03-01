import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import { StoreType } from '../common/store';

const Container = styled.figure`
    width: 95%;
    margin: 0;
    box-sizing: content-box;
    margin: 0 auto;
`;

const FigureGrid = styled.div`
    display: grid;
    justify-items: stretch;
    grid-template-columns: 50px 1fr 50px;
    width: 100%;
    margin: 0 auto;
`;

const CenteredFigcaption = styled.figcaption`
    text-align: center;
`;

const ItemCell = styled.div<{ isNumeric: boolean }>`
    box-sizing: border-box;
    padding: 0 5px;
    text-align: ${props => props.isNumeric ? "right" : "center"};
    width: 100%;
    height: 30px;

    display: grid;
    align-items: center;
`;

const BarContainer = styled.div`
    height: 100%;
    display: grid;
    justify-items: start;
    align-items: center;
`;

const Bar = styled.div<{ widthRatio: number }>`
    background-color: darkgreen;
    width: ${props => props.widthRatio * 100}%;
    height: 15px;
`;

const StatsGraph = () => {
    const successCount = useSelector<StoreType, readonly number[]>(state => state.statsReducer.successCount, shallowEqual);
    const failureCount = useSelector<StoreType, number>(state => state.statsReducer.failureCount);
    const counts = [...successCount, failureCount];
    const maxCount = counts.reduce((acc, c) => c > acc ? c : acc, 0);
    const ratios = maxCount > 0 ? counts.map(c => c / maxCount) : counts.map(_ => 0);
    return (
        <Container>
            <CenteredFigcaption>分布</CenteredFigcaption>
            <FigureGrid>
                {["1", "2", "3", "4", "5", "6", "NG"].map((item, i) =>
                    <React.Fragment key={`row${i}`}>
                        <ItemCell
                            isNumeric={item !== "NG"}
                        >
                            {item}
                        </ItemCell>
                        <BarContainer>
                            <Bar
                                widthRatio={ratios[i]}
                            >
                                &nbsp;
                            </Bar>
                        </BarContainer>
                        <ItemCell
                            isNumeric={true}
                        >
                            {counts[i]}
                        </ItemCell>
                    </React.Fragment>
                )}
            </FigureGrid>
        </Container>
    );
};

export default StatsGraph;