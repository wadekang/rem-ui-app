import { useEffect } from "react";

const CalendarDayInMonth = ({ selectedYear, selectedMonth, date, onClick }) => {

    useEffect(() => {

    }, [])

    return (
        <div
            style={{
                flex: 1,

                cursor: 'pointer',
                padding: '3px 2px',

                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

                opacity: date.getMonth() === selectedMonth ? 1.0 : 0.3,
                color: date.getDay() === 0 ? "red" : date.getDay() === 6 ? "blue" : "black",
            }}
            onClick={() => onClick(date)}
        >
            <div>
                {date.getDate()}
            </div>
            <div
                style={{
                    fontSize: "10px",
                    color: "gray",
                    borderRadius: "5%",
                    backgroundColor: "pink",
                    width: "100%",
                    padding: "0px 2px",
                    marginBottom: "2px",
                    lineHeight: "14px",
                }}
            >
                데이뚜💓
            </div>
            <div
                style={{
                    fontSize: "10px",
                    color: "gray",
                    borderRadius: "5%",
                    backgroundColor: "pink",
                    width: "100%",
                    padding: "0px 2px",
                    marginBottom: "2px",
                    lineHeight: "14px",
                }}
            >
                데이뚜💓
            </div>
        </div>
    )
}

export default CalendarDayInMonth;