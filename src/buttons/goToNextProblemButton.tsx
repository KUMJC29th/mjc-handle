import React from "react";
import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { AnswersAction } from "../answers/answersAction";
import { GameManagerAction } from "../gameManager/gameManagerAction";
import { OverlayAction } from "../overlay/overlayAction";
import { ProblemAction } from "../problems/problemAction";
import { TilePaletteAction } from "../tilePalette/tilePaletteAction";
import { ButtonBase } from "./buttonBase";

const GoToNextProblemButton = () => {
    const answersDispatch = useDispatch<Dispatch<AnswersAction>>();
    const tilePaletteDispatch = useDispatch<Dispatch<TilePaletteAction>>();
    const gameManagerDispatch = useDispatch<Dispatch<GameManagerAction>>();
    const problemDispatch = useDispatch<Dispatch<ProblemAction>>();
    const ovarlayDispatch = useDispatch<Dispatch<OverlayAction>>();
    const goToNextProblem = () => {
        answersDispatch({ type: "clearAnswer" });
        tilePaletteDispatch({ type: "clearTilePalette" });
        gameManagerDispatch({ type: "resetGameManager" });
        problemDispatch({ type: "nextProblem" });
        ovarlayDispatch({ type: "setShowsResultWindow", payload: { value: false }});
    };

    return (
        <ButtonBase
            onClick={goToNextProblem}
        >
            次の問題へ
        </ButtonBase>
    );
};

export default GoToNextProblemButton;