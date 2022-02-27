import React from 'react';
import { PureButtonBase } from './pureButtonBase';

type CloseButtonProps = {
    readonly onClick: () => void;
};

const CloseButton = ({ onClick }: CloseButtonProps) => {
    return (
        <PureButtonBase
            onClick={onClick}
        >
            <svg
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 25 25"
                height="25"
            >
                <line
                    stroke="gray"
                    strokeWidth="3"
                    x1="5" y1="5"
                    x2="20" y2="20"
                />
                <line
                    stroke="gray"
                    strokeWidth="3"
                    x1="20" y1="5"
                    x2="5" y2="20"
                />
            </svg>
        </PureButtonBase>
    )
};

export default CloseButton;