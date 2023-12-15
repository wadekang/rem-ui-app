import { Drawer } from "@mui/material";
import SidebarHeader from "./SidebarHeader";
import SidebarCalendarList from "./SidebarCalendarList";
import { Fragment, useEffect, useState } from "react";
import useAxiosInterceptor from "./config/useAxiosInterceptor";
import SidebarCalendarDrawer from "./SidebarCalendarDrawer";
import SidebarMyCalendarList from "./SidebarMyCalendarList";
import SidebarSharedCalendarList from "./SidebarSharedCalendarList";

const Sidebar = ({ sidebar, toggleSidebar }) => {

    const { axiosInstance } = useAxiosInterceptor();

    const [container, setContainer] = useState(undefined);
    const [myCalendars, setMyCalendars] = useState([]);
    const [sharedCalendars, setSharedCalendars] = useState([]);

    const [addDrawer, setAddDrawer] = useState(false);
    const [calendarManageDrawer, setCalendarManageDrawer] = useState({
        open: false,
        isOwner: false,
        isEdit: false,
        calendarId: null,
        calendarName: "",
        color: "",
    });
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        setContainer(window.document.body);

        getCalendars();
    }, [])

    const getCalendars = () => {
        axiosInstance.post('/api/calendar/getCalendars', {}, {})
        .then(res => res.data)
        .then(data => {
            if (data.code === 200) {
                const myCalendars = [];
                const sharedCalendars = [];

                data.data.forEach(calendar => {
                    if (calendar.owner) {
                        myCalendars.push(calendar);
                    } else {
                        sharedCalendars.push(calendar);
                    }
                })

                setMyCalendars(myCalendars);
                setSharedCalendars(sharedCalendars);
            }
        })
    }

    const toggleAddDrawer = () => setAddDrawer(!addDrawer);
    const closeCalendarDrawer = () => setCalendarManageDrawer(prev => ({...prev, open: false}));

    return (
        <Fragment>
            <Drawer
                container={container}
                variant="temporary"
                anchor="left"
                open={sidebar}
                onClose={toggleSidebar}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: "85%",
                        padding: "0px 15px",
                    },
                }}
            >
                <SidebarHeader />

                <SidebarMyCalendarList
                    setCalendarManageDrawer={setCalendarManageDrawer}
                >
                    <SidebarCalendarList 
                        title={"내 캘린더"}
                        calendars={myCalendars}
                    />
                </SidebarMyCalendarList>

                <SidebarSharedCalendarList>
                    <SidebarCalendarList 
                        title={"공유 캘린더"}
                        calendars={sharedCalendars}
                    />
                </SidebarSharedCalendarList>
                
            </Drawer>
            <SidebarCalendarDrawer 
                closeCalendarDrawer={closeCalendarDrawer}
                calendarManageDrawer={calendarManageDrawer}
                getCalendars={getCalendars}
            />
        </Fragment>
    )
}

export default Sidebar;