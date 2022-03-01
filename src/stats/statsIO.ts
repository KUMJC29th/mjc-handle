import { localStorageIsAvailable } from "../common/util";
import { StatsState } from "./statsState";

const keyVersion = "mjc-handle:version";
const keyStats = "mjc-handle:stats";
const currentVersion = "1.0";

export function loadStats(): StatsState {
    if (localStorageIsAvailable() && localStorage.getItem(keyVersion) !== null) {
        const value = localStorage.getItem(keyStats);
        if (value !== null) {
            const stats: StatsState = JSON.parse(value);
            return stats;
        }
    }

    return {
        successCount: [0, 0, 0, 0, 0, 0],
        failureCount: 0,
        currentStreak: 0,
        maxStreak: 0
    };
}

export function saveStats(stats: StatsState): void {
    if (localStorageIsAvailable()) {
        if (localStorage.getItem(keyVersion) === null) {
            localStorage.setItem(keyVersion, currentVersion);
        }
        localStorage.setItem(keyStats, JSON.stringify(stats));
    }
}