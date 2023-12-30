import { Fragment, useEffect, useState } from "react";

import CalendarManageHeader from "../calendar/CalendarManageHeader";
import CalendarSharedCodeInputBox from "../calendar/CalendarSharedCodeInputBox";
import axiosInstance from "../config/AxiosInstance";
import { useCalendarManage } from "./provider/CalendarManageProvider";
import { useDispatch } from "react-redux";
import { fetchCalendars } from "../redux/calendar/calendarSlice";
import { SidebarCalendarDrawerBody } from "./SidebarCalendarDrawer";

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
        if (code === "") {
            window.alert("코드를 입력해주세요.");
            return;
        }

        axiosInstance.post('/api/calendar/addSharedCalendar', {
            code: code,
        }, {})
        .then(res => res.data)
        .then(data => {
            if (data.code === 200) {
                window.alert("공유 캘린더가 추가 되었습니다.");
                
                dispatch(fetchCalendars());
            }
            else {
                window.alert("유효하지 않은 코드입니다.\n 코드를 확인 후 다시 추가하여 주세요.");
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
            <SidebarCalendarDrawerBody>
                <CalendarSharedCodeInputBox 
                    code={code}
                    setCode={setCode}
                />
            </SidebarCalendarDrawerBody>
        </Fragment>
    );
}

export default SidebarCalendarDrawerAddShared;