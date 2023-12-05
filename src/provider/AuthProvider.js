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
        setIsLogin(false);
        setUserInfo(undefined);
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