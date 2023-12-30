/** @jsxImportSource @emotion/react */

import { Fragment } from "react";
import { useCalendar } from "./provider/CalendarProvider";
import { useSelector } from "react-redux";
import { selectSelectedDate } from "../redux/date/dateSlice";
import styled from "@emotion/styled";

const WeekRowDatesContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const WeekRowDatesDiv = styled.div`
    flex: 1;

    color: ${props => props.day === 0 ? "red" : props.day === 6 ? "blue" : "black"};
    text-align: center;
    font-size: ${props => props.detailView ? "14px" : "12px"};

    display: flex;
    justify-content: center;
    align-items: center;
    
    padding: 0px 2px;
`;

const SelectedDateDiv = styled.div`
    width: 20px;
    height: 20px;

    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: lightgray;
`;

const CalendarWeekDatesRow = ({ weekDates }) => {

    const { detailView } = useCalendar();
    const selectedDate = useSelector(selectSelectedDate);

    const isSelectedDate = (date) => {
        return (
            selectedDate.year === date.getFullYear() &&
            selectedDate.month === date.getMonth() &&
            selectedDate.day === date.getDate()
        );
    }

    return (
        <WeekRowDatesContainer>
            {weekDates.map((date, idx) => (
                <Fragment key={idx}>
                    <WeekRowDatesDiv
                        detailView={detailView}
                        day={date.getDay()}
                    >
                        {detailView && isSelectedDate(date) ? (
                            <SelectedDateDiv>
                                {date.getDate()}
                            </SelectedDateDiv>
                        ) : (
                            date.getDate()
                        )}
                    </WeekRowDatesDiv>
                </Fragment>
            ))}
        </WeekRowDatesContainer>
    );
}

export default CalendarWeekDatesRow;