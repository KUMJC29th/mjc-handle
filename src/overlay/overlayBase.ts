import styled from "styled-components";

export const OverlayBase = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 15px;
    padding: 15px;
    z-index: 100;
`;