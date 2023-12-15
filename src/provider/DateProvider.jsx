import { createContext, useContext, useMemo, useState } from "react";

const DateContext = createContext();

export const DateProvider = ({ children }) => {

    const [selectedDate, setSelectedDate] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth(), // 0 ~ 11
    });

    const today = useMemo(() => {
        return new Date();
    }, [])

    return (
        <DateContext.Provider value={{ today, selectedDate, setSelectedDate }}>
            {children}
        </DateContext.Provider>
    );
}

export const useDate = () => {
    return useContext(DateContext);
}

