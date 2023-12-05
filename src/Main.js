import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Calendar from "./Calendar";

import "./Main.css";
import { DateProvider } from "./provider/DateProvider";

const Main = () => {

    const [sidebar, setSidebar] = useState(false);

    const toggleSidebar = () => setSidebar(!sidebar);

    useEffect(() => {

        // iPhone Safari에서 주소창을 제외한 화면 높이를 100vh로 설정
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        // resize 이벤트가 발생할 때마다 vh를 다시 계산하여 설정 - 현재 아이폰만 사용할 예정이므로 주석 처리
        // window.addEventListener('resize', () => {
        //     let vh = window.innerHeight * 0.01;
        //     document.documentElement.style.setProperty('--vh', `${vh}px`);
        // });

    }, [])

    return (
        <div className="main-body">
            <DateProvider>
                <Sidebar 
                    sidebar={sidebar}
                    toggleSidebar={toggleSidebar}
                />
                <Header 
                    toggleSidebar={toggleSidebar}
                />
                <Calendar />
            </DateProvider>
        </div>
    )
}

export default Main;