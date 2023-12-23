import { Fragment } from "react";

const CalendarWeekDatesRow = ({ weekDates }) => {

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                position: "relative",
            }}
        >
            {weekDates.map((date, idx) => (
                <Fragment key={idx}>
                    <div
                        style={{
                            flex: 1,
                            textAlign: "center",
                            padding: "0px 2px",

                            color: date.getDay() === 0 ? "red" : date.getDay() === 6 ? "blue" : "black",
                        }}
                    >
                        {date.getDate()}
                    </div>
                </Fragment>
            ))}
        </div>
    );
}

export default CalendarWeekDatesRow;