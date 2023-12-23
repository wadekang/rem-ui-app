import { Fragment, useState } from "react";

import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import axiosInstance from "../config/AxiosInstance";

const CalendarCodeGenerator = ({ calendarId }) => {

    const [code, setCode] = useState("");

    const generateCode = () => {

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
            navigator.clipboard.writeText(code);
            window.alert("클립보드에 복사되었습니다.");
        } catch (error) {
            window.alert("복사에 실패했습니다.");
        }
    }

    return (
        <Fragment>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <IosShareRoundedIcon 
                    style={{
                        marginRight: "20px",
                    }}
                />
                <span
                    style={{
                        color: "#4DA4EA",
                    }}
                    onClick={generateCode}
                >
                    공유 코드 생성
                </span>
            </div>
            {code && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "20px",
                    }}
                    onClick={copyCode}
                >
                    <div
                        style={{
                            color: 'gray',
                            fontSize: "0.8rem",
                        }}
                    >
                        코드를 클릭하여 복사 후 공유하세요. <br />
                        코드는 24시간 동안 유효하며, 한 사람이 등록하면 다른 사람은 등록할 수 없습니다. 
                    </div>
                    <div
                        style={{
                            width: "100%",
                            wordBreak: "break-all",
                            textDecoration: "underline",
                            color: "#4DA4EA",
                        }}
                    >
                        {code}
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default CalendarCodeGenerator;