import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isLogin, setIsLogin] = useState(false);
    const [userInfo, setUserInfo] = useState(undefined);
    const [onLoad, setOnLoad] = useState(true);

    useEffect(() => {
            
        tokenValidOnLoad();
    }, [])

    const login = (userInfo) => {
        setIsLogin(true);
        setUserInfo(userInfo);
    }

    const logout = () => {

        axios.get('http://localhost:12012/api/auth/logout', {
            withCredentials: true,
        })
        .then(res => {
            setIsLogin(false);
            setUserInfo(undefined);
        })
        .catch(err => {
            console.log('logout error', err);
        })
    }

    /**
     * 사이트 접속 시 토큰이 유효한지 검증하여 로그인 여부 결정
     */
    const tokenValidOnLoad = () => {
            
        axios.get('http://localhost:12012/api/auth/isTokenValid', {
            withCredentials: true,
        })
        .then(res => res.data)
        .then(data => {

            if (data.code === 200) {
                login(data.data);
            }
        })
        .catch(err => {})
        .finally(() => setOnLoad(false));
    }

    return (
        <AuthContext.Provider value={{ isLogin, userInfo, login, logout, onLoad }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}