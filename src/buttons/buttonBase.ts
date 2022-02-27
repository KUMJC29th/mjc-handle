import styled from "styled-components";

export const ButtonBase = styled.button`
    width: 120px;
    height: 30px;
    border-radius: 5px;
    background-color: #E0E0F0;
    border: none;
    user-select: none;
    cursor: ${props => props.disabled ? "default" : "pointer"};
`;