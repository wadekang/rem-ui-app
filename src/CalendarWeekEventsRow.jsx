import { Fragment, useCallback, useEffect, useState } from "react";

const CalendarWeekEventsRow = ({ eventMapRow, weekEvents, singleWidth }) => {

    const [children, setChildren] = useState([]);

    useEffect(() => {

        const newChildren = [];

        for (var i=0; i<7; i++) {

            if (eventMapRow[i] === 0) {
                newChildren.push(makeEvent(i, null));
            }
            else {
                newChildren.push(makeEvent(i, weekEvents[eventMapRow[i] - 1]));
                i = i + weekEvents[eventMapRow[i] - 1].length - 1;
            }
        }

        setChildren(newChildren);
    }, [eventMapRow, weekEvents])

    const makeEvent = useCallback((key, event) => {
        return (
            <div
                key={key}
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
                    <Fragment>
                        <div
                            style={{
                                borderRadius: "5%",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                backgroundColor: event.color,
                                paddingLeft: '2px'
                            }}
                        >
                            {event.eventName}
                        </div>
                    </Fragment>
                ) : (
                    null
                )}
            </div>
        )
    }, [singleWidth])

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