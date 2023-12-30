/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import CalendarBody from "./CalendarBody";
import CalendarHeader from "./CalendarHeader";
import { CalendarProvider } from "./provider/CalendarProvider";

const CalendarContainer = styled.div`
    position: absolute;

    margin-top: 50px;

    width: 100%;
    height: calc(100% - 50px);

    font-size: 12px;
`;

const Calendar = () => {

    return (
        <CalendarProvider>
            <CalendarContainer>
                <CalendarHeader />
                <CalendarBody />
            </CalendarContainer>
        </CalendarProvider>
    )
}

export default Calendar;