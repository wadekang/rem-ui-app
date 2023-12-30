/** @jsxImportSource @emotion/react */

import { Drawer } from "@mui/material";
import SidebarHeader from "./SidebarHeader";
import SidebarCalendarList from "./SidebarCalendarList";
import { Fragment, useEffect, useState } from "react";
import SidebarCalendarDrawer from "./SidebarCalendarDrawer";
import SidebarMyCalendarList from "./SidebarMyCalendarList";
import SidebarSharedCalendarList from "./SidebarSharedCalendarList";
import { useDispatch, useSelector } from "react-redux";
import { fetchCalendars, selectMyCalendars, selectSharedCalendars } from "../redux/calendar/calendarSlice";
import { CalendarManageProvider } from "./provider/CalendarManageProvider";

const Sidebar = ({ sidebar, toggleSidebar }) => {

    const [container, setContainer] = useState(undefined);

    const dispatch = useDispatch();
    const myCalendars = useSelector(selectMyCalendars);
    const sharedCalendars = useSelector(selectSharedCalendars);

    const [calendarManageDrawer, setCalendarManageDrawer] = useState({
        open: false,
        isOwner: false,
        isEdit: false,
        calendarId: null,
        calendarName: "",
        color: "",
    });

    useEffect(() => {
        setContainer(window.document.body);

        dispatch(fetchCalendars());
    }, [])

    const getCalendars = () => {
        
    }

    const closeCalendarDrawer = () => setCalendarManageDrawer(prev => ({...prev, open: false}));

    return (
        <CalendarManageProvider>
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
                    }}
                    css={{
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: "85%",
                            padding: "0px 15px",
                        },

                        height: "100%",
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

                    <SidebarSharedCalendarList
                        setCalendarManageDrawer={setCalendarManageDrawer}
                    >
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
        </CalendarManageProvider>
    )
}

export default Sidebar;