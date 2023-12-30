/** @jsxImportSource @emotion/react */

import { Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import SidebarCalendarDrawerAddShared from "./SidebarCalendarDrawerAddShared";
import SidebarCalendarDrawerAddMine from "./SidebarCalendarDrawerAddMine";
import SidebarCalendarDrawerEditMine from "./SidebarCalendarDrawerEditMine";
import SidebarCalendarDrawerEditShared from "./SidebarCalendarDrawerEditShared";
import { useCalendarManage } from "./provider/CalendarManageProvider";
import styled from "@emotion/styled";

export const SidebarCalendarDrawerBody = styled.div`
    flex: 1;

    padding: 25px 20px;
`;

const SidebarCalendarDrawer = () => {

    const [container, setContainer] = useState(undefined);

    const { drawer, action } = useCalendarManage();

    useEffect(() => {
        setContainer(window.document.body);

    }, [])

    const renderBody = () => {

        switch(action) {
            case "addMine":
                return <SidebarCalendarDrawerAddMine />
            case "addShared":
                return <SidebarCalendarDrawerAddShared />
            case "editMine":
                return <SidebarCalendarDrawerEditMine />
            case "editShared":
                return <SidebarCalendarDrawerEditShared />
            default:
                return null;
        }
    }

    return (
        <Drawer
            container={container}
            variant="temporary"
            anchor="bottom"
            open={drawer}
            sx={{
                display: { xs: "block", sm: "none" },
            }}
            css={{
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }
            }}
        >
            {renderBody()}
        </Drawer>
    );
}

export default SidebarCalendarDrawer;