/** @jsxImportSource @emotion/react */

import { AddRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import styled from "@emotion/styled";

const CalendarListContainer = styled.div`
    padding-left: 5px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 10px;
`;

const CalendarListInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 15px;
`;

const CalendarListTitle = styled.div`
    color: #808080;
    font-size: 16px;
`;

const CalendarListItemDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 10px;
`;

const CalendarListItem = styled.div`
    display: flex;
    align-items: center;
`;

const CalendarListItemCheckbox = styled.div`
    width: 20px;
    height: 20px;

    border-radius: 20%;
    border: 1px solid ${props => props.color};

    background-color: ${props => props.checked ? props.color : "white"};

    margin-right: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const CalendarListItemTitle = styled.div`
    font-size: 16px;
`;

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
        <CalendarListContainer>
            <CalendarListInfo>
                <CalendarListTitle>
                    {title}
                </CalendarListTitle>
                <AddRounded 
                    css={{
                        color: "#808080",
                        fontSize: "20px",
                        opacity: 0.5
                    }}
                    onClick={addCalendar}
                />
            </CalendarListInfo>
            <div>
                {calendars && checked && calendars.map((calendar, idx) => (
                    <CalendarListItemDiv key={calendar.calendarId} >
                        <CalendarListItem>
                            <CalendarListItemCheckbox
                                checked={checked[idx]}
                                color={calendar.color}
                                onClick={() => setChecked((prev) => {
                                    const temp = [...prev];
                                    temp[idx] = !temp[idx];
                                    return temp;
                                })}
                            >
                                {checked[idx] && (
                                    <CheckOutlinedIcon 
                                        css={{
                                            color: "white",
                                            fontSize: "18px",
                                            fontWeight: 900,
                                        }}
                                    />
                                )}
                            </CalendarListItemCheckbox>
                            <CalendarListItemTitle>
                                {calendar.owner && calendar.default ? "[기본] " + calendar.calendarName : calendar.calendarName}
                            </CalendarListItemTitle>
                        </CalendarListItem>
                        <ArrowCircleRightOutlinedIcon 
                            css={{
                                fontSize: "20px",
                                color: "#808080",
                                opacity: 0.5
                            }}
                            onClick={() => editCalendar(calendar)}
                        /> 
                    </CalendarListItemDiv>
                ))}
            </div>
        </CalendarListContainer>
    );
}

export default SidebarCalendarList;