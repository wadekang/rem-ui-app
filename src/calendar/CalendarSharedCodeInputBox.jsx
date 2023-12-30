/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { Fragment } from "react";

const CodeInputInfoText = styled.div`
    margin-bottom: 5px;
`;

const SharedCodeInput = styled.input`
    width: 100%;
    height: 35px;

    border-bottom: #4DA4EA 1px solid;
    border-radius: 0px;
    outline: none;

    font-size: 0.9rem;

    background-color: transparent;
    padding: 0px 5px;

    ::placeholder {
        font-size: 0.8rem;
    }
`;

const CalendarSharedCodeInputBox = ({ code, setCode }) => {

    return (
        <Fragment>
            <CodeInputInfoText>
                공유받은 코드를 입력해주세요.
            </CodeInputInfoText>

            <SharedCodeInput
                placeholder="코드 입력"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
        </Fragment>
    );
}

export default CalendarSharedCodeInputBox;