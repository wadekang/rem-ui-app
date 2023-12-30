/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import WeekEvents from "./WeekEvents";
import styled from "@emotion/styled";

const WeekEventsRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 2px;
`;

const WeekEventsRow = ({ eventMapRow, weekEvents }) => {

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
        return <WeekEvents key={key} event={event} />
    }

    return (
        <WeekEventsRowContainer>
            {children}
        </WeekEventsRowContainer>
    );
}

export default WeekEventsRow;