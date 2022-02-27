import { sumArray } from "../common/util";
import { loadStats } from "../stats/statsIO";
import { ProblemAction } from "./problemAction";
import { problemsSource } from "./problemsSource";

export type ProblemState = {
    readonly problemNumber: number;
    readonly hand: readonly number[];
    readonly roundWind: number;
    readonly seatWind: number;
    readonly isBySelfDraw: boolean;
};

export function getProblem(number: number): ProblemState {
    //
    console.log(`getProblem(${number})`);
    //
    const i = number % (Math.floor(problemsSource.length / 15));
    const s = problemsSource.substring(15 * i, 15 * i + 14);
    const flags = parseInt(problemsSource[15 * i + 14], 36);
    return {
        problemNumber: i,
        hand: s.split("").map(c => parseInt(c, 36)),
        roundWind: (flags >> 3) & 0b11,
        seatWind: (flags >> 1) & 0b11,
        isBySelfDraw: (flags & 0b1) > 0
    };
}

function getInitialProblemNumber(): number {
    const { successCount, failureCount } = loadStats();
    return sumArray(successCount) + failureCount;
}

const initialState = getProblem(getInitialProblemNumber());

export const problemReducer = (state: ProblemState = initialState, action : ProblemAction): ProblemState => {
    switch (action.type) {
        case "nextProblem":
            return getProblem(state.problemNumber + 1);
        default: return state;
    }
};