import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

const CalendarManageHeader = ({ headerName, onClickClose, onClickDone }) => {

    return (
        <div
            style={{
                width: "100%",
                height: "40px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "3px 15px",

                borderBottom: "1px solid #e0e0e0",
                boxShadow: "0px 0px 3px 1px rgba(0,0,0,0.25)",
            }}
        >
            <ClearRoundedIcon 
                onClick={onClickClose}
            />
            <div>
                {headerName}
            </div>
            <DoneRoundedIcon 
                onClick={onClickDone}
            />
        </div>
    );
}

export default CalendarManageHeader;