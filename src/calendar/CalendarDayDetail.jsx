/** @jsxImportSource @emotion/react */

import { useCalendar } from "./provider/CalendarProvider";
import CalendarDayDetailHeader from "./CalendarDayDetailHeader";
import { useEffect, useState } from "react";
import { selectEvents } from "../redux/event/eventSlice";
import { useSelector } from "react-redux";
import CalendarDayDetailEventCard from "./CalendarDayDetailEventCard";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import styled from "@emotion/styled";
import { selectSelectedDate } from "../redux/date/dateSlice";

const DetailDiv = styled.div`
    height: ${props => props.detailView ? (props.maxHeight / 2) + 40 : 0}px;

    padding: 10px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const CloseDiv = styled.div`
    height: 40px;

    display: flex;
    justify-content: center;
    align-items: center;

    margin: 5px 0px;
`;

const CloseIconDiv = styled.div`
    width: 40px;
    height: 40px;

    border-radius: 50%;
    box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.4);

    display: flex;
    justify-content: center;
    align-items: center;
`;

const CalendarDayDetail = ({ maxHeight }) => {

    const [dayEvents, setDayEvents] = useState([]);

    const selectedDate = useSelector(selectSelectedDate);

    const { detailView, closeDetailView } = useCalendar();
    const events  = useSelector(selectEvents);

    const { days } = useCalendar();

    useEffect(() => {

        if (detailView) {

            const newEvents = [];

            const selectedDay = new Date(selectedDate.year, selectedDate.month, selectedDate.day);

            events.forEach(e => {
                const event = { ...e };

                event.startDate = new Date(e.startDate + "T00:00:00");
                event.endDate = new Date(e.endDate + "T00:00:00");

                if (event.startDate > selectedDay || event.endDate < selectedDay) return;

                newEvents.push(event);
            })

            setDayEvents(newEvents);
        }

    }, [detailView, selectedDate])

    const getEventDate = (event) => {

        const startDate = event.startDate;
        const endDate = event.endDate;

        if (startDate.getTime() === endDate.getTime()) return "종일";
        return `${getDateString(startDate)} - ${getDateString(endDate)}`;
    }

    const getDateString = (date) => {
        return `${date.getMonth() + 1}. ${date.getDate()}. ${days[date.getDay()]}`;
    }

    return (
        <DetailDiv
            detailView={detailView}
            maxHeight={maxHeight}
        >
            <div>
                <CalendarDayDetailHeader />
                <div>
                    {dayEvents.length > 0 ? (
                        dayEvents.map((e, idx) => (
                            <CalendarDayDetailEventCard 
                                color={e.color}
                                title={e.eventName}
                                subtitle={getEventDate(e)}
                                key={idx}
                            />
                        ))
                    ) : ( 
                        <CalendarDayDetailEventCard 
                            color={"lightgray"}
                            subtitle={"일정이 없습니다."}
                            height={"40px"}
                        />    
                    )}
                </div>
            </div>
            <CloseDiv>
                <CloseIconDiv>
                    <KeyboardArrowDownRoundedIcon 
                        onClick={closeDetailView}
                    />
                </CloseIconDiv>
            </CloseDiv>
        </DetailDiv>
    );
}

export default CalendarDayDetail;