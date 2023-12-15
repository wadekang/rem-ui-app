import { Drawer } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { CirclePicker } from "react-color";
import useAxiosInterceptor from "./config/useAxiosInterceptor";

/** @jsxImportSource @emotion/react */

const colors = [
    "#FAEDCB", "#C9E4DE", "#C6DEF1", "#DBCDF0", "#F2C6DE", "#F7D9C4",
    "#FFADAD", "#FFD6A5", "#FDFFB6", "#E4F1EE", "#D9EDF8", "#DEDAF4",
    "#FD8A8A", "#FFCBCB", "#9EA1D4", "#F1F7B5", "#A8D1D1", "#DFEBEB",
    "#CCD5AE", "#E9EDC9", "#E7F1DC", "#FEFAE0", "#E3E7A0", "#B5C1B2"
]

const SidebarCalendarDrawer = ({ closeCalendarDrawer, calendarManageDrawer, getCalendars }) => {

    const [container, setContainer] = useState(undefined);
    const [colorPicker, setColorPicker] = useState(false);
    const [color, setColor] = useState(colors[Math.floor(Math.random() * colors.length)]);
    const [calendarName, setCalendarName] = useState("");

    const { axiosInstance } = useAxiosInterceptor();

    useEffect(() => {
        setContainer(window.document.body);

    }, [])

    useEffect(() => {

        if (calendarManageDrawer.open && calendarManageDrawer.isEdit) {
            setCalendarName(calendarManageDrawer.calendarName);
            setColor(calendarManageDrawer.color);
        }

    }, [calendarManageDrawer])

    const toggleColorPicker = () => setColorPicker(!colorPicker);

    const closeDrawer = () => {
        setColorPicker(false);
        setCalendarName("");
        setColor(colors[Math.floor(Math.random() * colors.length)]);
        closeCalendarDrawer();
    }

    const onClickDone = () => {

        if (calendarManageDrawer.isEdit) {
            editCalendar();
        }
        else {
            addCalendar();
        }
    }

    const addCalendar = () => {
        if (calendarName === "") {
            window.alert("캘린더 이름을 입력해주세요.");
            return;
        }

        axiosInstance.post('/api/calendar/addCalendar', {
            calendarName,
            color,
            owner: calendarManageDrawer.isOwner
        }, {})
            .then(res => res.data)
            .finally(() => {
                getCalendars();
                closeDrawer();
            })
    }

    const editCalendar = () => {

    }

    const deleteCalendar = () => {
        const result = window.confirm("캘린더를 삭제하면 저장된 모든 일정도 영구적으로 삭제됩니다.\n 캘린더를 삭제하시겠습니까?");

        if (result) {

            axiosInstance.post('/api/calendar/deleteCalendar', {
                calendarId: calendarManageDrawer.calendarId,
            }, {})
                .then(res => res.data)
                .finally(() => {
                    getCalendars();
                    closeDrawer();
                })
        }
    }

    const deleteCondition = calendarManageDrawer.isEdit 
            && calendarManageDrawer.isOwner 
            && !calendarManageDrawer.isDefault;

    return (
        <Drawer
            container={container}
            variant="temporary"
            anchor="bottom"
            open={calendarManageDrawer.open}
            sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "40px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "3px 15px",
                }}
            >
                <ClearRoundedIcon 
                    onClick={closeDrawer}
                />
                <div>
                    {calendarManageDrawer.isEdit ? calendarManageDrawer.calendarName : "새 캘린더"}
                </div>
                <DoneRoundedIcon 
                    onClick={onClickDone}
                />
            </div>

            <div
                style={{
                    flex: 1,
                    padding: "25px 20px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    <CalendarTodayRoundedIcon 
                        style={{
                            marginRight: "20px",
                        }}
                    />
                    <input 
                        type="text"
                        placeholder="캘린더 이름"
                        css={{
                            width: "100%",
                            height: "30px",
                            border: "none",
                            borderRadius: "5px",
                            outline: "none",
                            fontSize: "1rem",
                        }}
                        value={calendarName}
                        onChange={(e) => setCalendarName(e.target.value)}
                        readOnly={!calendarManageDrawer.isOwner}
                    />
                </div>

                <Fragment>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "20px",
                        }}
                    >
                        <PaletteRoundedIcon 
                            style={{
                                marginRight: "20px",
                            }}
                            onClick={toggleColorPicker}
                        />
                        <div
                            style={{
                                borderRadius: "50%",
                                backgroundColor: color,
                                width: "1rem",
                                height: "1rem"
                            }}
                            onClick={toggleColorPicker}
                        />
                    </div>
                    <div
                        css={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 1,

                            visibility: colorPicker ? "visible" : "hidden",
                            opacity: colorPicker ? 1 : 0,
                            transition: "opacity 0.5s, visibility 0.5s ease",
                        }}
                    >
                        <CirclePicker
                            styles={{
                                default: {
                                    card: {
                                        visibility: colorPicker ? "visible" : "hidden",
                                        maxHeight: colorPicker ? 126 : 0,
                                        transition: "max-height 0.3s, visibility 0.5s ease-in-out",
                                    }
                                }
                            }}
                            color={color}
                            colors={colors}
                            onChangeComplete={(color) => setColor(color.hex)}
                        />
                    </div>
                </Fragment>
            </div>
            {deleteCondition && (
                <div
                    style={{
                        paddingBottom: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            boxShadow: "0px 2px 3px 1px rgba(0,0,0,0.25)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <DeleteRoundedIcon 
                            onClick={deleteCalendar}
                        />
                    </div>
                </div>
            )}
        </Drawer>
    );
}

export default SidebarCalendarDrawer;