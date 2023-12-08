import axiosInstance from "../config/axiosInstance";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isLogin, setIsLogin] = useState(false);
    const [userInfo, setUserInfo] = useState(undefined);

    const login = (userInfo) => {
        setIsLogin(true);
        setUserInfo(userInfo);
    }

    const logout = () => {

        axiosInstance.get('http://localhost:12012/api/auth/logout', {
            withCredentials: true,
        })
        .then(res => res.data)
        .then(data => {
            setIsLogin(false);
            setUserInfo(undefined);
        })
        .catch(err => {
            console.log('logout error', err);
        })
    }

    return (
        <AuthContext.Provider value={{ isLogin, userInfo, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}