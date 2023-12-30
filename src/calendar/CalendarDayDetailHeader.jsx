/** @jsxImportSource @emotion/react */

import { useSelector } from "react-redux";
import { selectSelectedDate } from "../redux/date/dateSlice";
import { useEffect, useState } from "react";
import { useCalendar } from "./provider/CalendarProvider";
import styled from "@emotion/styled";

const DetailHeaderContainer = styled.div`
    width: 100%;
    height: 25px;

    display: flex;
    justify-content: space-between;
`;

const DetailHeaderDateDiv = styled.div`
    font-size: 17px;
    font-weight: 600;

    padding-left: 10px;
`;

const CalendarDayDetailHeader = () => {

    const selectedDate = useSelector(selectSelectedDate);
    const { days } = useCalendar();

    const [selectedDay, setSelectedDay] = useState(new Date());

    useEffect(() => {

        setSelectedDay(new Date(selectedDate.year, selectedDate.month, selectedDate.day));
    }, [selectedDate])

    return (
        <DetailHeaderContainer>
            <DetailHeaderDateDiv>
                {selectedDay.getDate()}. {days[selectedDay.getDay()]}
            </DetailHeaderDateDiv>
        </DetailHeaderContainer>
    )
}

export default CalendarDayDetailHeader;