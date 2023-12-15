
const headerItemStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
}

const CalendarHeader = () => {

    return (
        <div style={{
            display: "flex",
            width: "100%",
            height: "30px",
            justifyContent: "space-between",
            padding: "0px 5px",
        }}>
            <div style={{
                ...headerItemStyle,
                color: "red",
            }}>일</div>
            <div style={headerItemStyle}>월</div>
            <div style={headerItemStyle}>화</div>
            <div style={headerItemStyle}>수</div>
            <div style={headerItemStyle}>목</div>
            <div style={headerItemStyle}>금</div>
            <div style={{
                ...headerItemStyle,
                color: "blue",
            }}>토</div>
        </div>
    )
}

export default CalendarHeader;
