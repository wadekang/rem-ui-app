import { Fragment, useEffect, useState } from "react";
import { Divider } from "@mui/material";
import CalendarWeek from "./CalendarWeek";
import { useDate } from "./provider/DateProvider";
import useAxiosInterceptor from "./config/useAxiosInterceptor";

const CalendarBody = () => {

    const { selectedDate } = useDate();

    const [dates, setDates] = useState([]);
    const [events, setEvents] = useState([]);

    const { axiosInstance } = useAxiosInterceptor();

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

    }, [selectedDate])

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

        axiosInstance.post('/api/event/getEvents', {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
        }, {})
        .then(res => res.data)
        .then(data => {
            if (data.code === 200) {
                const newEvents = [];

                data.data.forEach(e => {
                    newEvents.push({
                        calendarId: e.calendarId,
                        color: e.calendarColor,
                        eventId: e.eventId,
                        eventName: e.eventName,
                        startDate: new Date(e.eventStartDate),
                        endDate: new Date(e.eventEndDate),
                    })
                })

                setEvents(newEvents);
            }
        })
    }

    const onClick = (date) => {
        
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                flex: 1
            }}
        >
            {dates.map((date, idx) => (
                <Fragment key={idx}>
                    <CalendarWeek 
                        weekDates={date.weekDates}
                        events={events}
                    />
                    {idx !== dates.length - 1 && <Divider />}
                </Fragment>
            ))}
        </div>
    );
}

export default CalendarBody;