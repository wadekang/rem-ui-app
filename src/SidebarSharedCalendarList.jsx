import React, { Fragment } from "react"

const SidebarSharedCalendarList = ({ setCalendarManageDrawer, children }) => {

    const addCalendar = () => {
        setCalendarManageDrawer(prev => {

            return {
                ...prev,
                open: true,
                isOwner: false,
                isEdit: false,
            }
        })
    }

    const editCalendar = (calendar) => {

        setCalendarManageDrawer(prev => {

            return {
                ...prev,
                open: true,
                isOwner: false,
                isDefault: false,
                isEdit: true,
                calendarId: calendar.calendarId,
                calendarName: calendar.calendarName,
                color: calendar.color,
            }
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