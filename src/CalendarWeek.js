import { useEffect, useRef, useState } from "react";
import CalendarWeekDatesRow from "./CalendarWeekDatesRow";
import CalendarWeekEventsRow from "./CalendarWeekEventsRow";
import { useDate } from "./provider/DateProvider";

const CalendarWeek = ({ weekNum, weekDates }) => {

    const ref = useRef(null);
    const { selectedDate } = useDate();

    const [events, setEvents] = useState([]);
    const [eventMap, setEventMap] = useState([]);
    const [singleWidth, setSingleWidth] = useState(0);

    useEffect(() => {

        if (ref.current) {
            setSingleWidth(ref.current.offsetWidth / 7);
        }

    }, [])

    useEffect(() => {

        if (weekNum === 49) {
            drawEvents();
        } else if (weekNum === 50) {
            drawEvents2();
        } else {
            setEvents([]);
            setEventMap([]);
        }

    }, [weekNum])

    const getWeekEvent = (weekNum) => {

        // Get Events From DB


    }

    const drawEvents = () => {

        setEvents([
            {
                title: '데이뚜💓',
                startDate: new Date(2023, 12, 3),
                endDate: new Date(2023, 12, 4),
                diff: 2,
                color: 'pink',
            },
            {
                title: '여행💓',
                startDate: new Date(2023, 12, 7),
                endDate: new Date(2023, 12, 8),
                diff: 2,
                color: '#F5F5DC',
            },
            {
                title: '데이뚜💓',
                startDate: new Date(2023, 12, 7),
                endDate: new Date(2023, 12, 7),
                diff: 1,
                color: 'pink',
            },
            {
                title: '일정',
                startDate: new Date(2023, 12, 8),
                endDate: new Date(2023, 12, 10),
                diff: 2,
                color: '#F5F5DC',
            },

        ]);

        setEventMap(
            [
                [1, 1, 0, 0, 2, 2, 0],
                [0, 0, 0, 0, 3, 4, 4],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
            ]
        );
    }

    const drawEvents2 = () => {
        setEvents([
            {
                title: '데이뚜💓',
                startDate: new Date(2023, 12, 3),
                endDate: new Date(2023, 12, 4),
                diff: 2,
                color: 'pink',
            },
            {
                title: '여행💓',
                startDate: new Date(2023, 12, 7),
                endDate: new Date(2023, 12, 8),
                diff: 2,
                color: '#F5F5DC',
            },
            {
                title: '데이뚜💓',
                startDate: new Date(2023, 12, 7),
                endDate: new Date(2023, 12, 7),
                diff: 1,
                color: 'pink',
            },
            {
                title: '일정',
                startDate: new Date(2023, 12, 8),
                endDate: new Date(2023, 12, 10),
                diff: 1,
                color: '#F5F5DC',
            },

        ]);

        setEventMap(
            [
                [4, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
            ]
        );
    }

    return (
        <div
            style={{
                padding: "0px 5px",
                flex: 1
            }}
        >
            <div
                ref={ref}
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <CalendarWeekDatesRow 
                    weekDates={weekDates}
                />
                {eventMap.map((eventsRow, idx) => (
                    <CalendarWeekEventsRow
                        key={idx}
                        eventsRow={eventsRow}
                        events={events}
                        singleWidth={singleWidth}
                    />
                ))}
            </div>
        </div>
    );
};

export default CalendarWeek;
