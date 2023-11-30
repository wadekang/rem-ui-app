import { useEffect } from "react";
import CalendarBody from "./CalendarBody";
import CalendarHeader from "./CalendarHeader";

const Calendar = ({ selectedYear, selectedMonth }) => {

    useEffect(() => {

    }, [])

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            paddingTop: "50px", // header height (40px) + header margin-bottom (10px)
            height: "100%",
            fontSize: "12px",
        }}>
            <CalendarHeader />
            <CalendarBody 
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
            />
        </div>
    )
}

export default Calendar;