import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Main = () => {

    const [view, setView] = useState("calendar");
    const [sidebar, setSidebar] = useState(false);

    const toggleSidebar = () => setSidebar(!sidebar);

    return (
        <div className="main-body">
            <Sidebar 
                sidebar={sidebar}
                toggleSidebar={toggleSidebar}
            />
            <Header 
                view={view}
                setView={(val) => setView(val)}
                toggleSidebar={toggleSidebar}
            />
            Hello World!
        </div>
    )
}

export default Main;