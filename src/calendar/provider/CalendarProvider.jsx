import { createContext, useContext, useState } from "react"

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {

    const [singleWidth, setSingleWidth] = useState(0);
    const [detailView, setDetailView] = useState(false);
    
    const days = ["일", "월", "화", "수", "목", "금", "토"];

    const openDetailView = () => {
     
        setDetailView(true);
    }
    const closeDetailView = () => setDetailView(false);
    
    return (
        <CalendarContext.Provider value={{ 
            singleWidth, setSingleWidth, detailView, openDetailView, closeDetailView, 
            days
        }}>
            {children}
        </CalendarContext.Provider>
    );
}

export const useCalendar = () => {
    return useContext(CalendarContext);
}

