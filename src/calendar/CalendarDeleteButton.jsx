import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import axiosInstance from '../config/AxiosInstance';
import { useDispatch } from 'react-redux';
import { fetchCalendars } from '../redux/calendar/calendarSlice';
import { useCalendarManage } from '../sidebar/provider/CalendarManageProvider';

const CalendarDeleteButton = ({ calendarId, deleteUrl }) => {

    const dispatch = useDispatch();

    const { closeDrawer } = useCalendarManage();

    const deleteCalendar = () => {
        const result = window.confirm("캘린더를 삭제하면 저장된 모든 일정도 영구적으로 삭제됩니다.\n 캘린더를 삭제하시겠습니까?");

        if (result) {

            axiosInstance.post(deleteUrl, {
                calendarId: calendarId,
            }, {})
                .then(res => res.data)
                .finally(() => {
                    dispatch(fetchCalendars());
                    closeDrawer();
                })
        }
    }

    return (
        <div
            style={{
                paddingBottom: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    boxShadow: "0px 2px 3px 1px rgba(0,0,0,0.25)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <DeleteRoundedIcon 
                    onClick={deleteCalendar}
                />
            </div>
        </div>
    );
}

export default CalendarDeleteButton;