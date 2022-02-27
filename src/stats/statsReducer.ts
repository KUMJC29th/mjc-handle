import { StatsAction } from "./statsAction";
import { loadStats, saveStats } from "./statsIO";
import { StatsState } from "./statsState";

const initialState = loadStats();

export const statsReducer = (state: StatsState = initialState, action: StatsAction): StatsState => {
    switch (action.type) {
        case "incrementStats":
            return action.payload.target === "failure" ? {
                successCount: [...state.successCount],
                failureCount: state.failureCount + 1,
                currentStreak: 0,
                maxStreak: state.maxStreak
            } : {
                successCount: state.successCount.map((c, i) => i === action.payload.target ? c + 1 : c),
                failureCount: state.failureCount,
                currentStreak: state.currentStreak + 1,
                maxStreak: state.currentStreak >= state.maxStreak ? state.currentStreak + 1 : state.maxStreak
            };
        case "saveStats": {
            saveStats(state);
            return state;
        }
        default: return state;
    }
}