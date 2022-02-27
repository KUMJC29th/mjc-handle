import React from "react";
import { Dispatch } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AnswersAction } from "../answers/answersAction";
import { AnswerTile } from "../answers/answersReducer";
import { hasAnyYaku } from "../common/hand";
import { StoreType } from "../common/store";
import { TileAndColor } from "../common/tileColor";
import { GameManagerAction } from "../gameManager/gameManagerAction";
import { OverlayAction } from "../overlay/overlayAction";
import { StatsAction } from "../stats/statsAction";
import { saveStats } from "../stats/statsIO";
import { TilePaletteAction } from "../tilePalette/tilePaletteAction";
import { ButtonBase } from "./buttonBase";

const checkAnswerAndGetTileColors = (answerHand: readonly number[], problemHand: readonly number[]): readonly TileAndColor[] => {
    const tileAndColors0: readonly TileAndColor[] = answerHand.map((tile, i) => ({
        tile: tile,
        color: tile === problemHand[i] ? "hit" : "none"
    }));
    const unhitProblemTiles = problemHand.filter((_, i) => tileAndColors0[i].color !== "hit");
    const tileAndColors1: TileAndColor[] = [];
    for (const tc of tileAndColors0) {
        if (tc.color === "hit") {
            tileAndColors1.push(tc);
        } else {
            const index = unhitProblemTiles.indexOf(tc.tile);
            if (index >= 0) {
                unhitProblemTiles[index] = -1;
                tileAndColors1.push({ color: "blow", tile: tc.tile });
            } else {
                tileAndColors1.push({ color: "incorrect", tile: tc.tile });
            }
        }
    }
    return tileAndColors1;
};

const EnterButton = () => {
    const index = useSelector<StoreType, number>(state => state.gameManagerReducer.index);
    const gameIsDone = useSelector<StoreType, boolean>(state => state.gameManagerReducer.gameIsDone);
    const answerHand = useSelector<StoreType, readonly AnswerTile[]>(state => state.answersReducer.answers[index].tiles, shallowEqual);
    const problemHand = useSelector<StoreType, readonly number[]>(state => state.problemReducer.hand, shallowEqual);
    const roundWind = useSelector<StoreType, number>(state => state.problemReducer.roundWind);
    const seatWind = useSelector<StoreType, number>(state => state.problemReducer.seatWind);
    const isBySelfDraw = useSelector<StoreType, boolean>(state => state.problemReducer.isBySelfDraw);
    const invalidHandMessageTimerId = useSelector<StoreType, number | null>(state => state.overlayReducer.invalidHandMessageTimerId);

    const answerDispatch = useDispatch<Dispatch<AnswersAction>>();
    const tilePaletteDispatch = useDispatch<Dispatch<TilePaletteAction>>();
    const gameManagerDispatch = useDispatch<Dispatch<GameManagerAction>>();
    const overlayDispatch = useDispatch<Dispatch<OverlayAction>>();
    const statsDispatch = useDispatch<Dispatch<StatsAction>>();
    
    const checkAnswer = () => {
        const answerHandTiles = answerHand.map(t => t.tile);
        if (!hasAnyYaku(answerHandTiles, roundWind, seatWind, isBySelfDraw)) {
            if (invalidHandMessageTimerId !== null) {
                clearTimeout(invalidHandMessageTimerId);
            }
            const timerId = window.setTimeout(() => {
                overlayDispatch({ type: "setShowsInvalidHandMessage", payload: { value: false, timerId: null }});
            }, 3500);
            overlayDispatch({ type: "setShowsInvalidHandMessage", payload: { value: true, timerId }});
            return;
        }
        const tileAndColors = checkAnswerAndGetTileColors(answerHandTiles, problemHand);
        answerDispatch({ type: "paintAnswer", payload: { index, colors: tileAndColors.map(tc => tc.color) } });
        tilePaletteDispatch({ type: "paintTilePalette", payload: { tileAndColors: tileAndColors } });

        if (tileAndColors.every(t => t.color === "hit")) {
            // 正解
            gameManagerDispatch({ type: "setGameIsDone" });
            statsDispatch({ type: "incrementStats", payload: { target: index }});
            statsDispatch({ type: "saveStats" });
            overlayDispatch({ type: "setShowsResultWindow", payload: { value: true }});
        } else if (index < 5) {
            // 次の解答欄へ
            gameManagerDispatch({ type: "nextIndex" });
        } else {
            // 規定回数オーバーで不正解
            gameManagerDispatch({ type: "setGameIsDone" });
            statsDispatch({ type: "incrementStats", payload: { target: "failure" }});
            statsDispatch({ type: "saveStats" });
            overlayDispatch({ type: "setShowsResultWindow", payload: { value: true }});
        }
    };

    return (
        <ButtonBase
            disabled={gameIsDone || answerHand.length < 14}
            onClick={checkAnswer}
        >
            入力
        </ButtonBase>
    );
};

export default EnterButton;