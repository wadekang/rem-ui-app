import { useEffect, useRef, useState } from "react";
import CalendarWeekDatesRow from "./CalendarWeekDatesRow";
import CalendarWeekEventsRow from "./CalendarWeekEventsRow";
import { useDate } from "./provider/DateProvider";

const CalendarWeek = ({ weekDates, events }) => {

    const ref = useRef(null);
    const { selectedDate } = useDate();

    const [weekEvents, setWeekEvents] = useState([]);
    const [outOfMonth, setOutOfMonth] = useState({
        width: 0,
        left: 0,
    });
    const [eventMap, setEventMap] = useState([
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
    ]);
    const [singleWidth, setSingleWidth] = useState(0);

    useEffect(() => {

        if (ref.current) {
            setSingleWidth(ref.current.offsetWidth / 7);
        }

    }, [])

    useEffect(() => {

        handleEvent();

    }, [events])

    useEffect(() => {

        const singleWidth = ref.current.offsetWidth / 7;
        const tmpStart = new Date(weekDates[0]);

        let count = 0;
        let dir = 0;

        if (tmpStart.getMonth() !== selectedDate.month) {
            while (tmpStart <= weekDates[6]) {
                if (tmpStart.getMonth() !== selectedDate.month) {
                    count++;
                }
                tmpStart.setDate(tmpStart.getDate() + 1);
            }
        }
        else if (weekDates[6].getMonth() !== selectedDate.month) {
            dir = 1;
            while (tmpStart <= weekDates[6]) {
                if (tmpStart.getMonth() !== selectedDate.month) {
                    count++;
                }
                tmpStart.setDate(tmpStart.getDate() + 1);
            }
        }
        else return;

        let left = dir === 1 ? singleWidth * (7 - count) : 0;
        let width = singleWidth * count;

        setOutOfMonth({
            width,
            left,
        });

    }, [weekDates])

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
            if (e.startDate > endDate || e.endDate < startDate) return;

            const event = { ...e };
            
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
                    position: "relative",
                }}
            >
                <CalendarWeekDatesRow 
                    weekDates={weekDates}
                    singleWidth={singleWidth}
                />
                {eventMap.map((eventMapRow, idx) => (
                    <CalendarWeekEventsRow
                        key={idx}
                        eventMapRow={eventMapRow}
                        weekEvents={weekEvents}
                        singleWidth={singleWidth}
                    />
                ))}

                {outOfMonth.width > 0 &&
                    <div
                        style={{
                            zIndex: 1,
                            position: "absolute",
                            top: "0px",
                            left: outOfMonth.left,
                            width: outOfMonth.width,
                            height: "100%",
                            backgroundColor: "rgba(255, 255, 255, 0.6)",
                        }}
                    />
                }
            </div>
        </div>
    );
};

export default CalendarWeek;
