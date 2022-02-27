import React from "react";
import styled from "styled-components";
import { fadeBase } from "./fadeBase";
import { OverlayBase } from "./overlayBase";


const Container = styled(OverlayBase)`
    color: white;
    background-color: rgba(32, 32, 32, 0.7);
    top: 100px;
    ${fadeBase}
`;

const InvalidHandMessage = () => {
    return (
        <Container>
            和了系ではないか、役がありません。
        </Container>
    );
};

export default InvalidHandMessage;