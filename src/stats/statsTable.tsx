import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import { StoreType } from '../common/store';
import { sumArray, toPercent } from '../common/util';

const Container = styled.div`
    display: grid;
    align-items: center;
    grid-auto-flow: column;
    grid-template-rows: 40px 50px;
    padding: 5px;
    width: 60%;
    min-width: 300px;
    margin: 0 auto;
`;

const HeaderCell = styled.div`
    text-align: center;
    font-size: small;
`

const Cell = styled.div`
    text-align: center;
    font-size: x-large;
`;

const StatsTable = () => {
    const successCount = useSelector<StoreType, readonly number[]>(state => state.statsReducer.successCount, shallowEqual);
    const failureCount = useSelector<StoreType, number>(state => state.statsReducer.failureCount);
    const currentStreak = useSelector<StoreType, number>(state => state.statsReducer.currentStreak);
    const maxStreak = useSelector<StoreType, number>(state => state.statsReducer.maxStreak);

    const successSum = sumArray(successCount);
    const rate = toPercent(successSum + failureCount === 0 ? 0 : successSum / (successSum + failureCount));

    return (
        <Container>
            <HeaderCell>正解数</HeaderCell>
            <Cell>{successSum}</Cell>
            <HeaderCell>正解率</HeaderCell>
            <Cell>{rate}</Cell>
            <HeaderCell>連続正解<br />（現在）</HeaderCell>
            <Cell>{currentStreak}</Cell>
            <HeaderCell>連続正解<br />（最大）</HeaderCell>
            <Cell>{maxStreak}</Cell>
        </Container>
    );
};

export default StatsTable;