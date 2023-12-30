/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { getEventColor } from "../calendar/CalendarWeekEventsRowColorMap";
import { useCalendar } from "../calendar/provider/CalendarProvider";

const WeekEventsContainer = styled.div`
    width: ${props => props.length ? props.singleWidth * props.length : props.singleWidth}px;

    font-size: 10px;
    padding: 0px 2px;
    line-height: 14px;
`;

const WeekEventsDiv = styled.div`
    border-radius: 5%;

    white-space: nowrap;
    overflow: hidden;

    background-color: ${props => props.backgroundColor};
    color: ${props => props.color};
    padding-left: 2px;
`;

const WeekEvents = ({ event }) => {

    const { singleWidth } = useCalendar();

    return (
        <WeekEventsContainer
            length={event ? event.length : 0}
            singleWidth={singleWidth}
        >
            { event ? (
                <WeekEventsDiv
                    backgroundColor={event.color}
                    color={getEventColor(event.color)}
                >
                    {event.eventName}
                </WeekEventsDiv>
            ) : (
                null
            )}
        </WeekEventsContainer>
    );
}

export default WeekEvents;