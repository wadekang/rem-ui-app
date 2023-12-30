import { Fragment, useEffect, useState } from "react";
import CalendarManageHeader from "../calendar/CalendarManageHeader";
import CalendarNameBox from "../calendar/CalendarNameBox";
import CalendarColorPicker from "../calendar/CalendarColorPicker";
import CalendarDeleteButton from "../calendar/CalendarDeleteButton";
import axiosInstance from "../config/AxiosInstance";
import { useDispatch } from "react-redux";
import { useCalendarManage } from "./provider/CalendarManageProvider";
import { fetchCalendars } from "../redux/calendar/calendarSlice";
import { SidebarCalendarDrawerBody } from "./SidebarCalendarDrawer";

const SidebarCalendarDrawerEditShared = () => {

    const { drawer, calendarManageInfo, closeDrawer } = useCalendarManage();

    const [color, setColor] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {

        if (drawer) {
            setColor(calendarManageInfo.color);
        }

    }, [drawer])

    const onClickDone = () => {
        
        axiosInstance.post('/api/calendar/updateSharedCalendar', {
            calendarId: calendarManageInfo.calendarId,
            color: color,
        }, {})
            .then(res => res.data)
            .finally(() => {
                dispatch(fetchCalendars());
                closeDrawer();
            })
    }

    return (
        <Fragment>
            <CalendarManageHeader
                headerName={calendarManageInfo.calendarName}
                onClickClose={closeDrawer}
                onClickDone={onClickDone}
            />

            <SidebarCalendarDrawerBody>
                <CalendarNameBox
                    calendarName={calendarManageInfo.calendarName}
                    isOwner={false}
                />

                <CalendarColorPicker 
                    color={color}
                    setColor={setColor}
                />
            </SidebarCalendarDrawerBody>
            <CalendarDeleteButton 
                calendarId={calendarManageInfo.calendarId}
                deleteUrl={'/api/calendar/deleteSharedCalendar'}
            />
        </Fragment>

    );
}

export default SidebarCalendarDrawerEditShared;