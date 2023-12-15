import React, { Fragment } from "react";

const SidebarMyCalendarList = ({ setCalendarManageDrawer, children }) => {

    const addCalendar = () => {
        setCalendarManageDrawer(prev => {

            return {
                ...prev,
                open: true,
                isOwner: true,
                isEdit: false,
            }
        })
    }

    const editCalendar = (calendar) => {

        setCalendarManageDrawer(prev => {

            return {
                ...prev,
                open: true,
                isOwner: true,
                isDefault: calendar.default,
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

export default SidebarMyCalendarList;