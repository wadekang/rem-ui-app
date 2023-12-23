import React, { Fragment } from "react";
import { useCalendarManage } from "./provider/CalendarManageProvider";

const SidebarMyCalendarList = ({ children }) => {

    const { openDrawer } = useCalendarManage();

    const addCalendar = () => {

        openDrawer("addMine", { isOwner: true, })
    }

    const editCalendar = (calendar) => {

        openDrawer("editMine", {
            isOwner: true,
            isDefault: calendar.default,
            calendarId: calendar.calendarId,
            calendarName: calendar.calendarName,
            color: calendar.color,
        })
    }

    return (
        <Fragment>
            {React.cloneElement(children, {
                addCalendar,
                editCalendar,
            })}
        </Fragment>
    );
}

export default SidebarMyCalendarList;