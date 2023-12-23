import { useState } from "react";
import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";
import Calendar from "./calendar/Calendar";

import "./Main.css";

const Main = () => {

    const [sidebar, setSidebar] = useState(false);

    const toggleSidebar = () => setSidebar(!sidebar);

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <Sidebar 
                sidebar={sidebar}
                toggleSidebar={toggleSidebar}
            />
            <Header 
                toggleSidebar={toggleSidebar}
            />
            <Calendar />
        </div>
    )
}

export default Main;