/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';

const CalendarNameBoxContainer = styled.div`
    display: flex;
    align-items: center;

    margin-bottom: 20px;
`;

const CalendarNameInput = styled.input`
    width: 100%;
    height: 35px;

    outline: none;
    background-color: transparent;

    ::placeholder {
        font-size: 0.8rem;
    }

    font-size: 1rem;
`;

const CalendarNameDiv = styled.div`
    width: 100%;
    height: 35px;

    border: none;
    border-radius: 5px;

    outline: none;
    font-size: 1rem;

    display: flex;
    align-items: center;
`;

const CalendarNameBox = ({ calendarName, setCalendarName, isOwner }) => {

    return (
        <CalendarNameBoxContainer>
            <CalendarTodayRoundedIcon 
                css={{
                    marginRight: "20px",
                }}
            />
            {isOwner ? (
                <CalendarNameInput 
                    type="text"
                    placeholder="캘린더 이름"
                    value={calendarName}
                    onChange={(e) => setCalendarName(e.target.value)}
                />
            ) : (
                <CalendarNameDiv>
                    {calendarName}
                </CalendarNameDiv>
            )}
        </CalendarNameBoxContainer>
    );
}

export default CalendarNameBox;