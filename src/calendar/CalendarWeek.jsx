/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import CalendarWeekDatesRow from "./CalendarWeekDatesRow";
import WeekEventsRow from "../event/WeekEventsRow";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedDate, setSelectedDate } from "../redux/date/dateSlice";
import { useCalendar } from "./provider/CalendarProvider";
import WeekEventsMini from "../event/WeekEventsMini";
import styled from "@emotion/styled";

const CalendarWeekContainer = styled.div`
    flex: 1;

    padding: 0px 5px;
`;

const CalendarWeekDiv = styled.div`
    width: 100%;
    height: 100%;

    position: relative;
`;

const CalendarWeekDivMask = styled.div`
    width: 100%;
    height: 100%;

    display: flex;

    position: absolute;
    top: 0;
    left: 0;

    z-index: 1;
`;

const CalendarWeekDivDayMask = styled.div`
    flex: 1;

    background-color: ${props => props.masking ? "rgba(255, 255, 255, 0.6)" : null};
    
    z-index: 1;
`; 

const CalendarWeek = ({ weekDates, events }) => {

    const selectedDate = useSelector(selectSelectedDate);
    const dispatch = useDispatch();
    
    const [weekEvents, setWeekEvents] = useState([]);
    const [eventMap, setEventMap] = useState([
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
    ]);

    const { detailView, openDetailView } = useCalendar();

    useEffect(() => {

        handleEvent();

    }, [events])

    const handleEvent = () => {

        const startDate = weekDates[0];
        const endDate = weekDates[6];
        
        const newEvents = [];
        const newEventMap = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ];

        let idx = 1;
        events.forEach(e => {
            const event = { ...e };

            event.startDate = new Date(e.startDate + "T00:00:00");
            event.endDate = new Date(e.endDate + "T00:00:00");

            if (event.startDate > endDate || event.endDate < startDate) return;
            
            if (event.startDate < startDate) {
                event.startDate = startDate;
            }

            if (event.endDate > endDate) {
                event.endDate = endDate;
            }

            event.length = (event.endDate.getDay() - event.startDate.getDay()) + 1;

            newEvents.push({
                ...event,
            })

            let startIdx = event.startDate.getDay();
            for (let i=0; i<newEventMap.length; i++) {

                if (newEventMap[i][startIdx] !== 0) continue;

                for (let j=0; j<event.length; j++) {
                    newEventMap[i][startIdx + j] = idx;
                }

                break;
            }

            idx++;
        });

        setWeekEvents(newEvents);
        setEventMap(newEventMap);
    }

    const onClickDay = (date) => {
        dispatch(setSelectedDate({
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate(),
        }));

        openDetailView();
    }

    return (
        <CalendarWeekContainer>
            <CalendarWeekDiv>
                <CalendarWeekDivMask>
                    {weekDates.map((date, idx) => (
                        <CalendarWeekDivDayMask
                            masking={date.getMonth() !== selectedDate.month}
                            key={idx}
                            onClick={() => onClickDay(date)}
                        />
                    ))}
                </CalendarWeekDivMask>
                <CalendarWeekDatesRow 
                    weekDates={weekDates}
                />
                {detailView ? (
                    <WeekEventsMini
                        weekDates={weekDates}
                        weekEvents={weekEvents}
                    />
                ) : (
                    eventMap.map((eventMapRow, idx) => (
                        <WeekEventsRow
                            key={idx}
                            eventMapRow={eventMapRow}
                            weekEvents={weekEvents}
                        />
                    ))
                )}
            </CalendarWeekDiv>
        </CalendarWeekContainer>
    );
};

export default CalendarWeek;
