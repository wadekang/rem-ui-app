/** @jsxImportSource @emotion/react */

import { Fragment, useState } from "react";

import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import axiosInstance from "../config/AxiosInstance";
import styled from "@emotion/styled";

const CodeGeneratorDiv = styled.div`
    display: flex;
    align-items: center;

    margin-bottom: 20px;

    & > span {
        color: #4DA4EA;

        cursor: pointer;
    }
`;

const CodeViewerDiv = styled.div`
    display: flex;
    flex-direction: column;

    margin-bottom: 20px;
`;

const CodeViewerInfoText = styled.div`
    color: gray;
    font-size: 0.8rem;
`;

const CodeViewerCodeText = styled.div`
    width: 100%;
    word-break: break-all;
    text-decoration: underline;
    color: #4DA4EA;

    cursor: pointer;
`;

const CalendarCodeGenerator = ({ calendarId }) => {

    const [code, setCode] = useState("");

    const generateCode = () => {
        if (code !== "") return;

        axiosInstance.post('/api/calendar/generateCalendarCode', {
            calendarId: calendarId,
        }, {})
        .then(res => res.data)
        .then(data => {
            if (data.code === 200) {
                setCode(data.data.code);
            }
        })
    }

    const copyCode = () => {
        try {
            navigator.clipboard.writeText(code)
            .then(res => {
                window.alert("클립보드에 복사되었습니다.");
            });
        } catch (error) {
            window.alert("복사에 실패했습니다.");
        }
    }

    return (
        <Fragment>
            <CodeGeneratorDiv>
                <IosShareRoundedIcon 
                    css={{
                        marginRight: "20px",
                    }}
                />
                <span
                    onClick={generateCode}
                >
                    공유 코드 생성
                </span>
            </CodeGeneratorDiv>
            {code && (
                <CodeViewerDiv
                    onClick={copyCode}
                >
                    <CodeViewerInfoText>
                        코드를 클릭하여 복사 후 공유하세요. <br />
                        코드는 24시간 동안 유효하며, 한 사람이 등록하면 다른 사람은 등록할 수 없습니다. 
                    </CodeViewerInfoText>
                    <CodeViewerCodeText>
                        {code}
                    </CodeViewerCodeText>
                </CodeViewerDiv>
            )}
        </Fragment>
    );
}

export default CalendarCodeGenerator;