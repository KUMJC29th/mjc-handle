import { css } from "styled-components";

export const fadeBase = css`
    &.fade-enter {
        opacity: 0;
    }
    &.fade-enter-active {
        opacity: 1;
        transition: opacity 0.3s;
    }
    &.fade-exit {
        opacity: 1;
    }
    &.fade-exit-active {
        opacity: 0;
        transition: opacity 0.5s;
    }
`;