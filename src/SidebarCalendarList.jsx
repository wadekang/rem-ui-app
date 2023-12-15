import { AddRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const SidebarCalendarList = ({ title, calendars, addCalendar, editCalendar }) => {

    const [checked, setChecked] = useState(undefined);

    useEffect(() => {

        if (!calendars) {
            return;
        }

        const temp = [];
        for (let i = 0; i < calendars.length; i++) {
            temp.push(true);
        }
        setChecked(temp);

    }, [calendars])

    return (
        <div style={{
            paddingLeft: "5px",
            borderBottom: "1px solid #e0e0e0",
            marginBottom: "10px",
        }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "15px",
            }}>
                <div style={{
                    color: "#808080",
                    fontSize: "16px",
                }}>
                    {title}
                </div>
                <AddRounded 
                    style={{
                        color: "#808080",
                        fontSize: "20px",
                        opacity: 0.5
                    }}
                    onClick={addCalendar}
                />
            </div>
            <div>
                {calendars && checked && calendars.map((calendar, idx) => (
                    <div key={calendar.calendarId} style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                    }}>
                        <div 
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                            onClick={() => setChecked((prev) => {
                                const temp = [...prev];
                                temp[idx] = !temp[idx];
                                return temp;
                            })}
                        >
                            <div
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "20%",
                                    backgroundColor: checked[idx] ? calendar.color : "white",
                                    marginRight: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: `1px solid ${calendar.color}`,
                                }}
                            >
                                {checked[idx] && (
                                    <CheckOutlinedIcon 
                                        style={{
                                            color: "white",
                                            fontSize: "18px",
                                            fontWeight: 900,
                                        }}
                                    />
                                )}
                            </div>
                            <div style={{
                                fontSize: "16px",
                            }}>
                                {calendar.default ? "[기본] " + calendar.calendarName : calendar.calendarName}
                            </div>
                        </div>
                        <ArrowCircleRightOutlinedIcon 
                            style={{
                                fontSize: "20px",
                                color: "#808080",
                                opacity: 0.5
                            }}
                            onClick={() => editCalendar(calendar)}
                        /> 
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SidebarCalendarList;