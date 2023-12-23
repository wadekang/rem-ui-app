/** @jsxImportSource @emotion/react */

import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';

const CalendarNameBox = ({ calendarName, setCalendarName, isOwner }) => {

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
            }}
        >
            <CalendarTodayRoundedIcon 
                style={{
                    marginRight: "20px",
                }}
            />
            {isOwner ? (
                <input 
                    type="text"
                    placeholder="캘린더 이름"
                    css={{
                        width: "100%",
                        height: "30px",
                        border: "none",
                        borderRadius: "5px",
                        outline: "none",
                        fontSize: "1rem",
                    }}
                    value={calendarName}
                    onChange={(e) => setCalendarName(e.target.value)}
                />
            ) : (
                <div
                    style={{
                        width: "100%",
                        height: "30px",
                        border: "none",
                        borderRadius: "5px",
                        outline: "none",
                        fontSize: "1rem",
                    }}
                >
                    {calendarName}
                </div>
            )}
        </div>
    );
}

export default CalendarNameBox;