/** @jsxImportSource @emotion/react */

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";
import Calendar from "./calendar/Calendar";
import styled from "@emotion/styled";

const MainContainer = styled.div`
    width: 100%;
    height: 100%;

    position: relative;
`;

const Main = () => {

    const [sidebar, setSidebar] = useState(false);

    const toggleSidebar = () => setSidebar(!sidebar);

    return (
        <MainContainer>
            <Sidebar 
                sidebar={sidebar}
                toggleSidebar={toggleSidebar}
            />
            <Header 
                toggleSidebar={toggleSidebar}
            />
            <Calendar />
        </MainContainer>
    )
}

export default Main;