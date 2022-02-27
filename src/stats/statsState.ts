export type StatsState = {
    readonly successCount: readonly number[];
    readonly failureCount: number;
    readonly currentStreak: number;
    readonly maxStreak: number;
};