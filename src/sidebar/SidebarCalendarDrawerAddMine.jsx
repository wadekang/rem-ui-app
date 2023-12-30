/** @jsxImportSource @emotion/react */

import { Fragment, useEffect, useState } from "react";
import CalendarManageHeader from "../calendar/CalendarManageHeader";
import CalendarNameBox from "../calendar/CalendarNameBox";
import CalendarColorPicker from "../calendar/CalendarColorPicker";
import axiosInstance from "../config/AxiosInstance";
import { useCalendarManage } from "./provider/CalendarManageProvider";
import { useDispatch } from "react-redux";
import { fetchCalendars } from "../redux/calendar/calendarSlice";
import { colors } from "../calendar/CalendarWeekEventsRowColorMap";
import { SidebarCalendarDrawerBody } from "./SidebarCalendarDrawer";

const SidebarCalendarDrawerAddMine = () => {

    const [calendarName, setCalendarName] = useState("");
    const [color, setColor] = useState("");

    const { drawer, closeDrawer } = useCalendarManage();

    const dispatch = useDispatch();

    useEffect(() => {

        if (drawer) {
            setCalendarName("");
            setColor(colors[Math.floor(Math.random() * colors.length)]);
        }

    }, [drawer])

    const onClickDone = () => {
        if (calendarName === "") {
            window.alert("캘린더 이름을 입력해주세요.");
            return;
        }

        axiosInstance.post('/api/calendar/addCalendar', {
            calendarName,
            color,
            owner: true
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
                headerName={"새 캘린더"}
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
            </SidebarCalendarDrawerBody>
        </Fragment>
    );
}

export default SidebarCalendarDrawerAddMine;