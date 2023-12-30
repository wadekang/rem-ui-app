/** @jsxImportSource @emotion/react */

import { Fragment, useEffect, useRef, useState } from "react";
import { Divider } from "@mui/material";
import CalendarWeek from "./CalendarWeek";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventsByDate, selectEvents } from "../redux/event/eventSlice";
import { selectSelectedDate } from "../redux/date/dateSlice";
import CalendarDayDetail from "./CalendarDayDetail";
import { useCalendar } from "./provider/CalendarProvider";
import styled from "@emotion/styled";

const BodyDiv = styled.div`
    width: 100%;
    height: calc(100% - 30px);

    display: flex;
    flex-direction: column;
`;

const CalendarDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: ${props => props.detailView ? (props.maxHeight / 2) - 40 : props.maxHeight}px;

    transition: height 0.4s ease-in-out;
`;

const CalendarBody = () => {

    const selectedDate = useSelector(selectSelectedDate);

    const ref = useRef(null);
    const [dates, setDates] = useState([]);
    const [maxHeight, setMaxHeight] = useState(0);

    const dispatch = useDispatch();
    const events = useSelector(selectEvents);

    const { setSingleWidth, detailView } = useCalendar();

    useEffect(() => {

        setSize();
        
        window.addEventListener('resize', setSize);

        return () => {
            window.removeEventListener('resize', setSize);
        }
    }, [])

    const setSize = () => {
        if (ref.current) {
            setSingleWidth((ref.current.offsetWidth - 10) / 7); // padding l, r = 5
            setMaxHeight(ref.current.offsetHeight)
        }
    }

    useEffect(() => {

        const { startWeek, endWeek } = getWeekRange(selectedDate.year, selectedDate.month);
        
        const newDates = [];
        for (let i=startWeek; i<=endWeek; i++) {
            const weekDates = getDatesOfWeek(selectedDate.year, i);
            
            newDates.push({
                weekNum: i,
                weekDates: weekDates,
            });
        }
        
        getEvents(newDates[0].weekDates[0], newDates[newDates.length - 1].weekDates[6]);
        setDates(newDates);

    }, [selectedDate.year, selectedDate.month])

    /**
     * Get week range of yyyy-mm
     * @param year 
     * @param month 
     * @returns 
     */
    const getWeekRange = (year, month) => {
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
    
        const startWeek = getWeekNumber(firstDayOfMonth);
        const endWeek = getWeekNumber(lastDayOfMonth);
    
        return { startWeek, endWeek };
    }
    
    /**
     * Get week number of date
     * @param date 
     * @returns 
     */
    const getWeekNumber = (date) => {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }

    /**
     * Get dates of week
     * @param year 
     * @param weekNumber 
     * @returns 
     */
    const getDatesOfWeek = (year, weekNumber) => {
        const firstDayOfYear = new Date(year, 0, 1);
        const days = (weekNumber - 1) * 7 - firstDayOfYear.getDay();
        const date = new Date(year, 0, 1 + days);

        return Array.from({length: 7}, (v, i) => {
            const d = new Date(date);
            d.setDate(d.getDate() + i);
            return d;
        });
    }

    const getEvents = (startDate, endDate) => {
        /*
            Get event list from server from startWeek to endWeek
            event endDate >= startWeek || startDate <= endWeek

            Response

            {
                "code": 200,
                "message": "OK",
                "data": [
                    {
                        calendarId, (from calendar)
                        calendarColor, (from calendar)
                        eventId,
                        eventName,
                        eventStartDate, (if startDate < startDateOfWeek, startDate = startDateOfWeek)
                        eventEndDate, (if endDate > endDateOfWeek, endDate = endDateOfWeek)
                    },
                    ...
                ]
                "time": 1634567890
            }
        */

        dispatch(fetchEventsByDate(startDate, endDate));
    }

    const onClick = (date) => {
        
    }

    return (
        <BodyDiv ref={ref}>
            <CalendarDiv
                detailView={detailView}
                maxHeight={maxHeight}
            >
                {dates.map((date, idx) => (
                    <Fragment key={idx}>
                        <CalendarWeek 
                            weekDates={date.weekDates}
                            events={events}
                        />
                        {!detailView && idx !== dates.length - 1 && <Divider />}
                    </Fragment>
                ))}
            </CalendarDiv>
            {detailView && 
                <Fragment>
                    <Divider />
                    <CalendarDayDetail 
                        maxHeight={maxHeight}
                    />
                </Fragment>
            }
        </BodyDiv>
    );
}

export default CalendarBody;