import { createSlice } from "@reduxjs/toolkit";

export const dateSlice = createSlice({
    name: "date",
    initialState: {
        selectedDate: {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            day: new Date().getDate()
        }
    },
    reducers: {
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;
        }
    }
})

export const selectSelectedDate = (state) => state.date.selectedDate;

export const { setSelectedDate } = dateSlice.actions;

export default dateSlice.reducer;