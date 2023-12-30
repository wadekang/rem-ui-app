import { useState, Fragment, useEffect } from "react";
import CalendarColorPicker from "../calendar/CalendarColorPicker";
import CalendarCodeGenerator from "../calendar/CalendarCodeGenerator";
import CalendarDeleteButton from "../calendar/CalendarDeleteButton";
import CalendarManageHeader from "../calendar/CalendarManageHeader";
import CalendarNameBox from "../calendar/CalendarNameBox";
import axiosInstance from "../config/AxiosInstance";
import { useCalendarManage } from "./provider/CalendarManageProvider";
import { useDispatch } from "react-redux";
import { fetchCalendars } from "../redux/calendar/calendarSlice";
import { SidebarCalendarDrawerBody } from "./SidebarCalendarDrawer";

/** @jsxImportSource @emotion/react */

const SidebarCalendarDrawerEditMine = () => {

    const [calendarName, setCalendarName] = useState("");
    const [color, setColor] = useState("");

    const { closeDrawer, drawer, calendarManageInfo } = useCalendarManage();

    const dispatch = useDispatch();

    useEffect(() => {
            
            if (drawer) {
                setCalendarName(calendarManageInfo.calendarName);
                setColor(calendarManageInfo.color);
            }
    }, [drawer])

    const onClickDone = () => {

        axiosInstance.post('/api/calendar/updateCalendar', {
            calendarId: calendarManageInfo.calendarId,
            calendarName: calendarName,
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
                headerName={calendarName}
                onClickClose={closeDrawer}
                onClickDone={onClickDone}
            />

            <SidebarCalendarDrawerBody>
                <CalendarNameBox 
                    calendarName={calendarName}
                    setCalendarName={setCalendarName}
                    isOwner={true}
                />

                <CalendarColorPicker 
                    color={color}
                    setColor={setColor}
                />
                
                <CalendarCodeGenerator 
                    calendarId={calendarManageInfo.calendarId}
                />
            </SidebarCalendarDrawerBody>
            <CalendarDeleteButton
                calendarId={calendarManageInfo.calendarId}
                deleteUrl={'/api/calendar/deleteCalendar'}
            />
        </Fragment>

    );
}

export default SidebarCalendarDrawerEditMine;