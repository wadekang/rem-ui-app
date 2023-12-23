import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./event/eventSlice";
import authReducer from "./auth/authSlice";
import dateReducer from "./date/dateSlice";
import calendarReducer from "./calendar/calendarSlice";

export default configureStore({
    reducer: {
        event: eventReducer,
        auth: authReducer,
        date: dateReducer,
        calendar: calendarReducer
    }
})