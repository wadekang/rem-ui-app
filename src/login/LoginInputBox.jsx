import styled from "@emotion/styled";
import React from "react";

/** @jsxImportSource @emotion/react */

const Div = styled.div`

    background-color: ${props => props.backgroundColor};

    display: flex;
    align-items: center;
    width: 100%;
    border: transparent;
    padding: 5px;

`;

const Input = styled.input`
    flex: 1;
    background-color: inherit;
    color: rgba(0, 0, 0, 0.8);

    ::placeholder {
        font-size: 0.7rem;
    }
`

const LoginInputBox = ({ style, icon, type, placeholder, backgroundColor = "#f2f2f2", state, setState }) => {

    return (
        <Div
            css={{
                ...style,
            }}
            backgroundColor={backgroundColor}
        >
            {React.cloneElement(icon, {
                style: {
                    marginRight: "10px",
                    fontSize: "1.1rem",
                    color: "rgba(0, 0, 0, 0.5)",
                }
            })}
            <Input
                type={type}
                placeholder={placeholder}
                value={state}
                onChange={(e) => setState(e.target.value)}
            />
        </Div>
    );
}

export default LoginInputBox;