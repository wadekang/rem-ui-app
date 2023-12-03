import { Fragment, useContext, useEffect, useState } from "react";
import CalendarDayInMonth from "./CalendarDayInMonth";
import { Divider } from "@mui/material";
import { SelectedContext } from "./Main";

const CalendarBody = () => {

    const { selectedDate } = useContext(SelectedContext);

    const [dates, setDates] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {

        const { startWeek, endWeek } = getWeekRange(selectedDate.year, selectedDate.month);

        const newDates = [];

        for (var i=startWeek; i<=endWeek; i++) {
            const weekDates = getDatesOfWeek(selectedDate.year, i);
            newDates.push(weekDates);
        }

        setDates(newDates);
    }, [selectedDate])

    const getWeekRange = (year, month) => {
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
    
        const startWeek = getWeekNumber(firstDayOfMonth);
        const endWeek = getWeekNumber(lastDayOfMonth);
    
        return { startWeek, endWeek };
    }
    
    const getWeekNumber = (date) => {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }

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

    const getEvents = (year, startWeek, endWeek) => {
        // Get Events From DB


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
            {dates.map((weekDates, weekIndex) => (
                <Fragment key={weekIndex}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flex: 1,
                            padding: "0px 5px",
                        }}
                    >
                        {weekDates.map((date, dateIndex) => (
                            <CalendarDayInMonth 
                                key={dateIndex}
                                date={date}
                                onClick={onClick}
                            />
                        ))}
                    </div>
                    {weekIndex !== dates.length - 1 && <Divider />}
                </Fragment>
            ))}
        </div>
    );
}

export default CalendarBody;