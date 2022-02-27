import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import { layoutConstant } from '../common/layoutConstant';
import { StoreType } from '../common/store';

const FigureGrid = styled.div`
    display: grid;
    justify-items: stretch;
    grid-template-columns: ${layoutConstant.graphItemWidth}px 1fr ${layoutConstant.graphCountWidth}px;
    padding: 5px;
    width: ${layoutConstant.graphWidth}px;
`;

const CenteredFigcaption = styled.figcaption`
    text-align: center;
`;

const ItemCell = styled.div<{ width: number, isNumeric: boolean }>`
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
    height: ${layoutConstant.graphBarHeight}px;
`;

const StatsGraph = () => {
    const successCount = useSelector<StoreType, readonly number[]>(state => state.statsReducer.successCount, shallowEqual);
    const failureCount = useSelector<StoreType, number>(state => state.statsReducer.failureCount);
    const counts = [...successCount, failureCount];
    const maxCount = counts.reduce((acc, c) => c > acc ? c : acc, 0);
    const ratios = maxCount > 0 ? counts.map(c => c / maxCount) : counts.map(_ => 0);
    return (
        <figure>
            <CenteredFigcaption>分布</CenteredFigcaption>
            <FigureGrid>
                {["1", "2", "3", "4", "5", "6", "不正解"].map((item, i) =>
                    <React.Fragment key={`row${i}`}>
                        <ItemCell
                            width={layoutConstant.graphItemWidth}
                            isNumeric={item !== "不正解"}
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
                            width={layoutConstant.graphCountWidth}
                            isNumeric={true}
                        >
                            {counts[i]}
                        </ItemCell>
                    </React.Fragment>
                )}
            </FigureGrid>
        </figure>
        
    );
};

export default StatsGraph;