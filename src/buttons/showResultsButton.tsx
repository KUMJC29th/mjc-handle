import React, { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { OverlayAction } from "../overlay/overlayAction";
import { PureButtonBase } from "./pureButtonBase";

const strokeWidth = 2;

const ShowResultsButton = () => {
    const overlayDispatch = useDispatch<Dispatch<OverlayAction>>();
    const showResultWindow = () => { overlayDispatch({ type: "setShowsResultWindow", payload: { value: true }}); };

    return (
        <PureButtonBase
            onClick={showResultWindow}
        >
            <svg
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                height="50"
            >
                <polyline
                    stroke="black"
                    strokeWidth={strokeWidth}
                    fill="none"
                    points="5,45 5,35 15,35 15,45"
                />
                <polyline
                    stroke="black"
                    strokeWidth={strokeWidth}
                    fill="none"
                    points="15,45 15,30 25,30 25,45"
                />
                <polyline
                    stroke="black"
                    strokeWidth={strokeWidth}
                    fill="none"
                    points="25,45 25,5 35,5 35,45"
                />
                <polyline
                    stroke="black"
                    strokeWidth={strokeWidth}
                    fill="none"
                    points="35,45 35,20 45,20 45,45"
                />
            </svg>
        </PureButtonBase>
    );
};

export default ShowResultsButton;