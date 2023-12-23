import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/AxiosInstance";

export const eventSlice = createSlice({
    name: "event",
    initialState: {
        events: []
    },
    reducers: {
        setEvents: (state, action) => {
            state.events = action.payload;
        }
    }
})

export const selectEvents = (state) => state.event.events;

export const fetchEventsByDate = (startDate, endDate) => {

    return async (dispatch, getState) => {
        const newEvents = await axiosInstance.post('/api/event/getEvents', {
            startDate: startDate,
            endDate: endDate
        }, {})
            .then(res => res.data)
            .then(data => {
                return data.data.map(e => ({
                    calendarId: e.calendarId,
                    color: e.calendarColor,
                    eventId: e.eventId,
                    eventName: e.eventName,
                    startDate: e.eventStartDate,
                    endDate: e.eventEndDate,
                }))
            })

        dispatch(setEvents(newEvents));
    }
}

export const { setEvents } = eventSlice.actions;

export default eventSlice.reducer;
