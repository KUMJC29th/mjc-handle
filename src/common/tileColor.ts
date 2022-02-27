export type TileColor = "none" | "hit" | "blow" | "incorrect";
export type TileAndColor = {
    readonly color: TileColor;
    readonly tile: number;
};