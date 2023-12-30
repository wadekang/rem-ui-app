/** @jsxImportSource @emotion/react */

import { useCallback } from "react";
import styled from "@emotion/styled";

const EventsMiniContainer = styled.div`
    width: 100%;
    height: calc(100% - 21px);

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const EventsMiniDiv = styled.div`
    flex: 1;

    font-size: 10px;
    padding: 0px 2px;
    line-height: 14px;
    
    display: flex;
    justify-content: center;
    align-items: center;
`;

const EventsMiniItem = styled.div`
    width: 5px;
    height: 5px;

    background-color: ${props => props.color};
    border-radius: 50%;
    margin-right: 2px;
`;

const WeekEventsMini = ({ weekDates, weekEvents }) => {

    const renderBody = useCallback((date) => {

        const body = [];

        const dayEvents = weekEvents.filter(e => e.startDate <= date && e.endDate >= date);

        dayEvents.forEach((e, idx) => {

            if (idx > 5) return;

            body.push(
                <EventsMiniItem 
                    key={idx}
                    color={e.color}
                />
            )
        })

        return body;
        
    }, [weekDates, weekEvents]);

    return (
        <EventsMiniContainer>
            {weekDates.map((date, idx) => (
                <EventsMiniDiv key={idx} >
                    {renderBody(date)}
                </EventsMiniDiv>
            ))}
        </EventsMiniContainer>
    );
}

export default WeekEventsMini;