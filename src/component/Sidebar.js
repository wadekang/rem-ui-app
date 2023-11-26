import { Drawer } from "@mui/material";
import SidebarHeader from "./SidebarHeader";
import SidebarCalendarList from "./SidebarCalendarList";

const Sidebar = ({ sidebar, toggleSidebar }) => {

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
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
            <SidebarCalendarList 
                title={"내 캘린더"}
                calendars={[
                    {
                        id: 1,
                        name: "[기본] 내 캘린더",
                        color: "#FF0000"
                    },
                    {
                        id: 2,
                        name: "내 할 일",
                        color: "#00FF00"
                    },
                    {
                        id: 3,
                        name: "내 습관",
                        color: "#0000FF"
                    }
                ]}
            />
            <SidebarCalendarList 
                title={"공유 캘린더"}
                calendars={[
                    {
                        id: 4,
                        name: "데이트",
                        color: "#FF0000"
                    },
                    {
                        id: 5,
                        name: "여행",
                        color: "#00FF00"
                    }
                ]}
            />
        </Drawer>
    )
}

export default Sidebar;