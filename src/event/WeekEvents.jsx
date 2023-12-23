import { getEventColor } from "../calendar/CalendarWeekEventsRowColorMap";

const WeekEvents = ({ event, singleWidth }) => {

    return (
        <div
            style={{
                width: event ? singleWidth * event.length : singleWidth,
                fontSize: "10px",
                color: "gray",
                padding: "0px 2px",
                lineHeight: "14px",
                position: "relative",
            }}
        >
            { event ? (
                <div
                    style={{
                        borderRadius: "5%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        backgroundColor: event.color,
                        color: getEventColor(event.color),
                        paddingLeft: '2px'
                    }}
                >
                    {event.eventName}
                </div>
            ) : (
                null
            )}
        </div>
    );
}

export default WeekEvents;