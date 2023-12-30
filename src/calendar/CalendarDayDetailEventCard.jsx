/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";

const EventCardDiv = styled.div`
    height: ${props => props.height ?? "50px"};

    padding: 5px 10px;

    display: flex;
    align-items: center;
`;

const EventColorDiv = styled.div`
    height: 100%;
    width: 4px;

    background-color: ${props => props.color};

    border-radius: 5px;
    margin-right: 10px;
`;

const EventTitleDiv = styled.div`
    font-size: 14px;
`;

const EventSubtitleDiv = styled.div`
    font-size: 11px;
    color: gray;
`;

const CalendarDayDetailEventCard = ({ color, title, subtitle, height }) => {

    return (
        <EventCardDiv
            height={height}
        >
            <EventColorDiv
                color={color}
            />
            <div>
                <EventTitleDiv>
                    {title}
                </EventTitleDiv>
                <EventSubtitleDiv>
                    {subtitle}
                </EventSubtitleDiv>
            </div>
        </EventCardDiv>
    );
}

export default CalendarDayDetailEventCard;