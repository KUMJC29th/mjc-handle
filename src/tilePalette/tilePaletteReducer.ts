import { TileColor } from "../common/tileColor";
import { TilePaletteAction } from "./tilePaletteAction";

export type TilePaletteState = {
    readonly colors: readonly TileColor[];
};

function createBlankTilePalette(): TilePaletteState {
    return {
        colors: new Array(34).fill("none")
    };
}

export const tilePaletteReducer = (state: TilePaletteState = createBlankTilePalette(), action: TilePaletteAction): TilePaletteState => {
    switch (action.type) {
        case "paintTilePalette": {
            const newColors = [...state.colors];
            for (const { color, tile } of action.payload.tileAndColors) {
                switch (color) {
                    case "hit": newColors[tile] = "hit"; break;
                    case "blow": if (newColors[tile] !== "hit") { newColors[tile] = "blow" } break;
                    case "incorrect": if (newColors[tile] === "none") { newColors[tile] = "incorrect" } break;
                    default: break;
                }
            }
            return {
                colors: newColors
            };
        }
        case "clearTilePalette":
            return createBlankTilePalette();
        default: return state;
    }
};