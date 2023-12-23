import React, { Fragment } from "react"
import { useCalendarManage } from "./provider/CalendarManageProvider"

const SidebarSharedCalendarList = ({ children }) => {

    const { openDrawer } = useCalendarManage();

    const addCalendar = () => {

        openDrawer("addShared", {
            isOwner: false,
        })
    }

    const editCalendar = (calendar) => {

        openDrawer("editShared", {
            isOwner: false,
            isDefault: false,
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

export default SidebarSharedCalendarList;