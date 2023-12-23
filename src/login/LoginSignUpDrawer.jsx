import { Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const LoginSignUpDrawer = ({ signup, closeSignUpDrawer }) => {

    const [container, setContainer] = useState(undefined);

    useEffect(() => {
        setContainer(window.document.body);

    }, [])

    return (
        <Drawer
            container={container}
            variant="temporary"
            anchor="bottom"
            open={signup}
            onClose={closeSignUpDrawer}
            sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                    width: "100%",
                    height: "90%",
                    
                    boxSizing: "border-box",
                }
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "100%",

                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px",
                        borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <div
                        style={{
                            visibility: "hidden",
                            width: "1.5rem",
                            height: "1.5rem",
                        }}
                    ></div>
                    <div>
                        회원가입
                    </div>
                    <ClearRoundedIcon
                        style={{
                            fontSize: "1.5rem"
                        }}
                        onClick={closeSignUpDrawer}
                    />
                </div>
                
            </div>

        </Drawer>
    );
}

export default LoginSignUpDrawer;