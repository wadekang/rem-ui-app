/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { useCalendar } from "./provider/CalendarProvider";

const HeaderDiv = styled.div`
    width: 100%;
    height: 30px;

    display: flex;
    justify-content: space-between;

    padding: 0px 5px;
`;

const DayDiv = styled.div`
    flex: 1;    

    display: flex;
    justify-content: center;
    align-items: center;

    &:first-of-type {
        color: red;
    }

    &:last-of-type {
        color: blue;
    }
`;

const CalendarHeader = () => {

    const { days } = useCalendar();

    return (
        <HeaderDiv>
            {days.map((day, index) => (
                <DayDiv key={index}>{day}</DayDiv>
            ))}
        </HeaderDiv>
    )
}

export default CalendarHeader;
