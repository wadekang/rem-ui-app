import { Drawer } from "@mui/material";
import { useEffect, useState } from "react";

const HeaderDatePicker = ({ datePick, toggleDatePick }) => {
    
    const [container, setContainer] = useState(undefined);

    useEffect(() => {
        setContainer(window.document.body);
    }, [])

    return (
        <Drawer
            container={container}
            variant="temporary"
            anchor="top"
            open={datePick}
            onClose={toggleDatePick}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: "100%",
                    height: "40%",
                    padding: "50px 50px 30px 50px",
                    zIndex: 3,
                    backgroundColor: "rgb(63, 61, 67)",
                },
                zIndex: 3,
            }}
        >
            <div>
                2023년 11월
            </div>
        </Drawer>
    );
}

export default HeaderDatePicker;