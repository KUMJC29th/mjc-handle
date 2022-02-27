import { enumerateRange, hasDuplicated, sumArray } from "./util";

type PartKind = "sequence" | "triplet" | "head";
export type Part = {
    readonly kind: PartKind;
    readonly tile: number;
};

function* reduceHands(tiles: readonly number[], startTileKind: number = 0, needsHead: boolean = true): IterableIterator<readonly Part[]> {
    if (sumArray(tiles) === 0) yield [];

    for (let i = startTileKind; i < 34; ++i) {
        if (tiles[i] >= 3) {
            const newPart: Part = { kind: "triplet", tile: i };
            const newTiles = [...tiles];
            newTiles[i] -= 3;
            for (const indicate of reduceHands(newTiles, i, needsHead)) {
                yield [newPart, ...indicate];
            }
        }
        if (tiles[i] > 0 && (i < 7 || (i >= 9 && i < 16) || (i >= 18 && i < 25)) && tiles[i + 1] > 0 && tiles[i + 2]) {
            const newPart: Part = { kind: "sequence", tile: i };
            const newTiles = [...tiles];
            --newTiles[i];
            --newTiles[i + 1];
            --newTiles[i + 2];
            for (const indicate of reduceHands(newTiles, i, needsHead)) {
                yield [newPart, ...indicate];
            }
        }
        if (needsHead && tiles[i] >= 2) {
            const newPart: Part = { kind: "head", tile: i };
            const newTiles = [...tiles];
            newTiles[i] -= 2;
            for (const indicate of reduceHands(newTiles, i, false)) {
                yield [newPart, ...indicate];
            }
        }
    }
}

function containsOrphan(part: Part): boolean {
    if (part.tile >= 27) return true;
    const i = part.tile % 9;
    return i === 0 || i === 8 || (i === 6 && part.kind === "sequence");
}

export function hasAnyYaku(hand: readonly number[], roundWind: number, seatWind: number, isBySelfDraw: boolean): boolean {
    const tiles = new Array(34).fill(0);
    for (const t of hand) {
        ++tiles[t];
    }

    // 七対子
    if (tiles.filter(n => n === 2).length === 7) {
        return true;
    }

    // 国士無双
    if (tiles[0] > 0 && tiles[8] > 0 && tiles[9] > 0 && tiles[17] > 0 && tiles[18] > 0 && tiles[26] > 0  && tiles[27] > 0 && tiles[28] > 0 && tiles[29] > 0 && tiles[30] > 0 && tiles[31] > 0 && tiles[32] > 0 && tiles[33] > 0) {
        return true;
    }

    for (const parts of reduceHands(tiles)) {
        if (parts.length !== 5) continue;
        if (isBySelfDraw) return true;

        // 飜牌（小三元、大三元、字一色、大四喜を含む）
        if (parts.find(p => p.kind === "triplet" && (p.tile >= 31 || p.tile === 27 + roundWind || p.tile === 27 + seatWind)) !== undefined)  {
            return true;
        }
        // 断幺九
        if (parts.every(p => !containsOrphan(p))) {
            return true;
        }
        // 平和
        const sequencePartsTile = parts.filter(p => p.kind === "sequence").map(p => p.tile);
        if (sequencePartsTile.length === 4) {
            const headTile = parts.find(p => p.kind === "head")!.tile;
            if (headTile !== 31 && headTile !== 32 && headTile !== 33 && headTile !== 27 + roundWind && headTile !== 27 + seatWind) {
                const winTile = hand[13];
                if (sequencePartsTile.find(t => (t === winTile && t % 9 <= 5) || (t + 2 === winTile && t % 9 >= 1)) !== undefined) {
                    return true;
                }
            }
        }
        // 一盃口（二盃口を含む）
        if (hasDuplicated(parts.filter(p => p.kind === "sequence").map(p => p.tile))) {
            return true;
        }
        // 混全帯幺九（混老頭、純全帯幺九、清老頭、小四喜を含む）
        if (parts.every(p => containsOrphan(p))) {
            return true;
        }
        // 一気通貫
        if (sequencePartsTile.length >= 3
            && ((sequencePartsTile.includes(0) && sequencePartsTile.includes(3) && sequencePartsTile.includes(6))
            || (sequencePartsTile.includes(9) && sequencePartsTile.includes(12) && sequencePartsTile.includes(15))
            || (sequencePartsTile.includes(18) && sequencePartsTile.includes(21) && sequencePartsTile.includes(24)))
        ) {
            return true;
        }
        // 三色同順
        if (sequencePartsTile.length >= 3 && enumerateRange(0, 9).find(i => sequencePartsTile.includes(i) && sequencePartsTile.includes(9 + i) && sequencePartsTile.includes(18 + i)) !== undefined) {
            return true;
        }
        // 三暗刻（三色同刻、対々和、四暗刻を含む）
        if (parts.filter(p => p.kind === "triplet").length >= 3) {
            return true;
        }
        // 混一色（清一色、緑一色、九蓮宝燈を含む）
        const numberPartsTile = parts.filter(p => p.tile < 27).map(p => p.tile);
        // numberParts.length > 0は確定
        const color = Math.floor(numberPartsTile[0] / 9);
        if (numberPartsTile.every(t => Math.floor(t / 9) === color)) {
            return true;
        }
    }

    return false;
}