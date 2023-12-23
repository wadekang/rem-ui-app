import { useEffect, useState } from "react";
import WeekEvents from "./WeekEvents";

const WeekEventsRow = ({ eventMapRow, weekEvents, singleWidth }) => {

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

    const makeEvent = (key, event) => {
        return <WeekEvents key={key} event={event} singleWidth={singleWidth} />
    }

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

export default WeekEventsRow;