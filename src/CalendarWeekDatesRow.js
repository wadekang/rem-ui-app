import { useDate } from "./provider/DateProvider";

const CalendarWeekDatesRow = ({ weekDates }) => {

    const { selectedDate } = useDate();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
            }}
        >
            {weekDates.map((date, idx) => (
                <div
                    key={idx}
                    style={{
                        flex: 1,
                        textAlign: "center",
                        padding: "0px 2px",

                        opacity: date.getMonth() === selectedDate.month ? 1.0 : 0.3,
                        color: date.getDay() === 0 ? "red" : date.getDay() === 6 ? "blue" : "black",
                    }}
                >
                    {date.getDate()}
                </div>
            ))}
        </div>
    );
}

export default CalendarWeekDatesRow;