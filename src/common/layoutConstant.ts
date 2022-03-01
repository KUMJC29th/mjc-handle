const tileWidth = 580;
const tileHeight = 830;
const tileHorizontalGap = 25;
const tileVerticalGap = tileHorizontalGap;
const winTileHorizontalGap = 5 * tileHorizontalGap;
const answerColumnWidth = 750;
const answerCoulumnViewBox = `0 0 ${(tileWidth + 2 * tileHorizontalGap) * 14 + winTileHorizontalGap} ${tileHeight + 2 * tileVerticalGap}`;
const tilePaletteTileScale = 15;
const tilePaletteWidth = answerColumnWidth / 2;
const tilePaletteViewBox = `0 0 ${(tileWidth + 2 * tileHorizontalGap) * 9} ${(tileHeight + 2 * tileVerticalGap) * 4}`;
const problemInfoTileViewBox = `${-tileWidth / 2} ${-tileHeight / 2} ${tileWidth} ${tileHeight}`;
const problemInfoTileHeight = tileHeight / tilePaletteTileScale;
const widthThreshold = 799;

export const layoutConstant = {
    tileWidth,
    tileHeight,
    tileHorizontalGap,
    tileVerticalGap,
    winTileHorizontalGap,
    answerColumnWidth,
    answerCoulumnViewBox,
    tilePaletteWidth,
    tilePaletteViewBox,
    problemInfoTileViewBox,
    problemInfoTileHeight,
    widthThreshold
} as const;

export function calcAnswerColumnTileX(index: number): number {
    return (index + 0.5) * layoutConstant.tileWidth + Math.floor(index / 13) * layoutConstant.winTileHorizontalGap + (2 * index + 1) * layoutConstant.tileHorizontalGap;
}