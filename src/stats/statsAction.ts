type StatsActionIncrement = {
    readonly type: "incrementStats";
    readonly payload: {
        readonly target: number | "failure";
    };
};

type StatsActionSave = {
    readonly type: "saveStats";
}

export type StatsAction = StatsActionIncrement | StatsActionSave;