import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Calendar from "./Calendar";

import "./Main.css";

const Main = () => {

    const [sidebar, setSidebar] = useState(false);
    const [selectedYear, setSelectedYear] = useState(2023);
    const [selectedMonth, setSelectedMonth] = useState(10); // 0 ~ 11

    const toggleSidebar = () => setSidebar(!sidebar);

    useEffect(() => {

    }, [])

    return (
        <div className="main-body">
            <Sidebar 
                sidebar={sidebar}
                toggleSidebar={toggleSidebar}
            />
            <Header 
                toggleSidebar={toggleSidebar}
            />
            <Calendar 
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
            />
        </div>
    )
}

export default Main;