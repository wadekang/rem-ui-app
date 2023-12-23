
const CalendarOutOfMonthFilter = ({ left, width }) => {

    return (
        <div 
            style={{
                zIndex: 1,
                position: "absolute",
                top: "0px",
                left: left,
                width: width,
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
            }}
        />
    );
}

export default CalendarOutOfMonthFilter;