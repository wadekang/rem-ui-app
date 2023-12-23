import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/AxiosInstance";

export const calendarSlice = createSlice({
    name: "calendar",
    initialState: {
        calendars: [],
        myCalendars: [],
        sharedCalendars: [],
    },
    reducers: {
        setCalendars: (state, action) => {
            state.calendars = action.payload;
        },
        setMyCalendars: (state, action) => {
            state.myCalendars = action.payload;
        },
        setSharedCalendars: (state, action) => {
            state.sharedCalendars = action.payload;
        }
    }
});

export const selectCalendars = (state) => state.calendar.calendars;
export const selectMyCalendars = (state) => state.calendar.myCalendars;
export const selectSharedCalendars = (state) => state.calendar.sharedCalendars;

export const fetchCalendars = () => {

    return async (dispatch, getState) => {

        axiosInstance.post('/api/calendar/getCalendars', {}, {})
        .then(res => res.data)
        .then(data => {
            if (data.code === 200) {
                const my = [];
                const shared = [];

                data.data.forEach(calendar => {
                    if (calendar.owner) {
                        my.push(calendar);
                    } else {
                        shared.push(calendar);
                    }
                })

                dispatch(setCalendars(data.data));
                dispatch(setMyCalendars(my));
                dispatch(setSharedCalendars(shared));
            }
        })
    }
}

export const { setCalendars, setMyCalendars, setSharedCalendars } = calendarSlice.actions;

export default calendarSlice.reducer;