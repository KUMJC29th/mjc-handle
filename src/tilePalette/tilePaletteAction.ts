import { TileAndColor } from "../common/tileColor";

type TilePaletteActionPaint = {
    type: "paintTilePalette";
    payload: {
        readonly tileAndColors: readonly TileAndColor[];
    };
};

type TilePaletteActionClear = {
    type: "clearTilePalette";
};

export type TilePaletteAction = TilePaletteActionPaint | TilePaletteActionClear;