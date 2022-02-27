const tileWidth = 580;
const tileHeight = 830;
const tileHorizontalGap = 25;
const tileVerticalGap = tileHorizontalGap;
const winTileHorizontalGap = 5 * tileHorizontalGap;
const answerColumnTileScale = 12;
const answerColumnHeight = (tileHeight + 2 * tileVerticalGap) / answerColumnTileScale;
const answerCoulumnViewBox = `0 0 ${(tileWidth + 2 * tileHorizontalGap) * 14 + winTileHorizontalGap} ${tileHeight + 2 * tileVerticalGap}`;
const tilePaletteTileScale = 15;
const tilePaletteHeight = (tileHeight + 2 * tileVerticalGap) * 4 / tilePaletteTileScale;
const tilePaletteViewBox = `0 0 ${(tileWidth + 2 * tileHorizontalGap) * 9} ${(tileHeight + 2 * tileVerticalGap) * 4}`;
const problemInfoTileViewBox = `${-tileWidth / 2} ${-tileHeight / 2} ${tileWidth} ${tileHeight}`;
const problemInfoTileHeight = tileHeight / tilePaletteTileScale;
const resultWindowWidth = tileWidth / tilePaletteTileScale * 16;
const resultWindowTileHeight = tileHeight / tilePaletteTileScale;
const graphWidth = tileWidth / tilePaletteTileScale * 14;
const graphItemWidth = 70;
const graphCountWidth = 50;
const graphBarHeight = 15;

export const layoutConstant = {
    tileWidth,
    tileHeight,
    tileHorizontalGap,
    tileVerticalGap,
    winTileHorizontalGap,
    answerColumnHeight,
    answerCoulumnViewBox,
    tilePaletteHeight,
    tilePaletteViewBox,
    problemInfoTileViewBox,
    problemInfoTileHeight,
    resultWindowWidth,
    resultWindowTileHeight,
    graphWidth,
    graphItemWidth,
    graphCountWidth,
    graphBarHeight
} as const;

export function calcAnswerColumnTileX(index: number): number {
    return (index + 0.5) * layoutConstant.tileWidth + Math.floor(index / 13) * layoutConstant.winTileHorizontalGap + (2 * index + 1) * layoutConstant.tileHorizontalGap;
}