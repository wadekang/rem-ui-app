import { useEffect, useState } from "react";

const CalendarWeekEventsRow = ({ eventsRow, events, singleWidth }) => {

    const [children, setChildren] = useState([]);

    useEffect(() => {

        const newChildren = [];

        for (var i=0; i<7; i++) {

            if (eventsRow[i] === 0) {

                newChildren.push(
                    <div
                        key={i}
                        style={{
                            width: singleWidth,
                            fontSize: "10px",
                            color: "gray",
                            padding: "0px 2px",
                            lineHeight: "14px",
                        }}
                    >
                        &nbsp;
                    </div>
                )

            } else {
                newChildren.push(
                    <div
                        key={i}
                        style={{
                            width: singleWidth * events[eventsRow[i]-1].diff,
                            fontSize: "10px",
                            color: "gray",
                            padding: "0px 2px",
                            lineHeight: "14px",
                        }}
                    >
                        <div
                            style={{
                                borderRadius: "5%",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                // textOverflow: "ellipsis",
                                backgroundColor: events[eventsRow[i]-1].color,
                                paddingLeft: '2px'
                            }}
                        >
                            {events[eventsRow[i]-1].title}
                        </div>
                    </div>
                )

                i = i + events[eventsRow[i]-1].diff - 1;
            }
        }

        setChildren(newChildren);
    }, [eventsRow, events])

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2px",
            }}
        >
            {children}
        </div>
    );
}

export default CalendarWeekEventsRow;