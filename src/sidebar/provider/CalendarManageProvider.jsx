import { createContext, useContext, useState } from "react";

const CalendarManageContext = createContext();

const initInfo = {
    isOwner: false,
    isDefault: false,
    calendarId: null,
    calendarName: "",
    color: ""
}

export const CalendarManageProvider = ({ children }) => {

    const [drawer, setDrawer] = useState(false);
    const [action, setAction] = useState(undefined);
    const [calendarManageInfo, setCalendarManageInfo] = useState(initInfo);

    const openDrawer = (action, calendarManageInfo) => {
        setDrawer(true);
        setAction(action);
        setCalendarManageInfo(prev => ({
            ...prev,
            ...calendarManageInfo
        }));
    }

    const closeDrawer = () => {
        setDrawer(false);
        setAction(undefined);
        setCalendarManageInfo(initInfo);
    }

    return (
        <CalendarManageContext.Provider value={{ drawer, action, calendarManageInfo, openDrawer, closeDrawer }}>
            {children}
        </CalendarManageContext.Provider>
    );
}

export const useCalendarManage = () => {
    return useContext(CalendarManageContext);
}