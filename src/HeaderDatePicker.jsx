import { Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import Picker from "react-mobile-picker";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedDate, setSelectedDate } from "./redux/date/dateSlice";

const HeaderDatePicker = ({ datePick, toggleDatePick }) => {
    
    const dispatch = useDispatch();
    const selectedDate = useSelector(selectSelectedDate);

    const [container, setContainer] = useState(undefined);
    const [date, setDate] = useState({
        year: '' + selectedDate.year,
        month: '' + (selectedDate.month + 1),
    });

    useEffect(() => {
        setContainer(window.document.body);
    }, [])

    const handlePickerChange = (newVal, key) => {

        dispatch(setSelectedDate({
            year: parseInt(newVal.year),
            month: parseInt(newVal.month) - 1,
        }))

        setDate({
            ...newVal,
        })

    };

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
                    height: "45%",
                    padding: "50px 50px 30px 50px",
                    zIndex: 3,
                    backgroundColor: "rgb(63, 61, 67)",
                },
                zIndex: 3,
            }}
        >
            <div style={{ height: '100%',  }}>
                <Picker
                    value={date}
                    onChange={handlePickerChange}
                    wheelMode="off"
                >
                    <Picker.Column name="year">
                        { Array.from({ length: 60 }, (_, i) => `${1980 + i}`).map((year) => (
                            <Picker.Item key={year} value={year}>
                                {({ selected }) => (
                                    <div className={selected ? 'font-semibold text-neutral-200' : 'text-neutral-400'}>{year}</div>
                                )}
                            </Picker.Item>
                        ))}
                    </Picker.Column>
                    <Picker.Column name="month">
                        { Array.from({ length: 12} ,(_, i) => `${i + 1}`).map((month) => (
                            <Picker.Item key={month} value={month}>
                                {({ selected }) => (
                                    <div className={selected ? 'font-semibold text-neutral-200' : 'text-neutral-400'}>{month}</div>
                                )}
                            </Picker.Item>
                        ))}
                    </Picker.Column>
                </Picker>
            </div>
        </Drawer>
    );
}

export default HeaderDatePicker;