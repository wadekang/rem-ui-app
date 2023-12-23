import { Fragment, useEffect, useState } from "react";

import CalendarManageHeader from "../calendar/CalendarManageHeader";
import CalendarSharedCodeInputBox from "../calendar/CalendarSharedCodeInputBox";
import axiosInstance from "../config/AxiosInstance";
import { useCalendarManage } from "./provider/CalendarManageProvider";
import { useDispatch } from "react-redux";
import { fetchCalendars } from "../redux/calendar/calendarSlice";

const SidebarCalendarDrawerAddShared = () => {

    const [code, setCode] = useState("");

    const { drawer, closeDrawer } = useCalendarManage();

    const dispatch = useDispatch();

    useEffect(() => {

        if (drawer) {
            setCode("");
        }

    }, [drawer])

    const onClickDone = () => {

        axiosInstance.post('/api/calendar/addSharedCalendar', {
            code: code,
        }, {})
        .then(res => res.data)
        .then(data => {
            if (data.code === 200) {
                window.alert("공유 캘린더가 추가 되었습니다.");
                
                dispatch(fetchCalendars());
            }
        })
        .finally(() => {

            closeDrawer();
        })
    }

    return (
        <Fragment>
            <CalendarManageHeader 
                headerName={"공유 캘린더 추가"}
                onClickClose={closeDrawer}
                onClickDone={onClickDone}
            />
            <div
                style={{
                    flex: 1,
                    width: "100%",
                    padding: "25px 20px",
                }}
            >
                <CalendarSharedCodeInputBox 
                    code={code}
                    setCode={setCode}
                />
            </div>
        </Fragment>
    );
}

export default SidebarCalendarDrawerAddShared;