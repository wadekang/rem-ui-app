import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/AxiosInstance";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        userInfo: null,
        isLogin: false,
        onLoad: true
    },
    reducers: {
        login: (state, action) => {
            state.userInfo = action.payload;
            state.isLogin = true;
            state.onLoad = false;
        },
        logout: (state) => {
            state.userInfo = null;
            state.isLogin = false;
            state.onLoad = false;
        }
    }
})

export const tokenValidOnLoad = () => {

    return async (dispatch, getState) => {
        const userInfo = await axiosInstance.get('/api/auth/isTokenValid', {})
            .then(res => res.data)
            .then(data => data.code === 200 ? data.data : null)

        if (userInfo) {
            dispatch(login(userInfo));
        }
    }
}

export const logoutAction = () => {

    return async (dispatch, getState) => {

        await axiosInstance.get('/api/auth/logout', {})
            .then(res => {
                dispatch(logout());
            })
    }
}

export const selectUserInfo = (state) => state.auth.userInfo;
export const selectIsLogin = (state) => state.auth.isLogin;
export const selectOnLoad = (state) => state.auth.onLoad;

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
