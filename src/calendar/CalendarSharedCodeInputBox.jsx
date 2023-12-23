/** @jsxImportSource @emotion/react */

import { Fragment } from "react";

const CalendarSharedCodeInputBox = ({ code, setCode }) => {

    return (
        <Fragment>
            <div
                style={{
                    marginBottom: "5px",
                }}
            >
                공유받은 코드를 입력해주세요.
            </div>

            <input 
                css={{
                    width: "100%",
                    height: "35px",
                    borderBottom: "#4DA4EA 1px solid",
                    borderRadius: "0px",
                    fontSize: "0.9rem",
                    backgroundColor: "transparent",

                    "::placeholder": {
                        fontSize: "0.8rem",
                    }
                }}
                placeholder="코드 입력"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
        </Fragment>
    );
}

export default CalendarSharedCodeInputBox;