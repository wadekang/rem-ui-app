/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

const HeaderDiv = styled.div`
    width: 100%;
    height: 40px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 3px 15px;

    border-bottom: 1px solid #e0e0e0;
    box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.25);
`;

const CalendarManageHeader = ({ headerName, onClickClose, onClickDone }) => {

    return (
        <HeaderDiv>
            <ClearRoundedIcon 
                onClick={onClickClose}
            />
            <div>
                {headerName}
            </div>
            <DoneRoundedIcon 
                onClick={onClickDone}
            />
        </HeaderDiv>
    );
}

export default CalendarManageHeader;