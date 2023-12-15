import { useEffect } from "react";
import axiosInstance from "./axiosInstance";
import { useAuth } from "../provider/AuthProvider";

const useAxiosInterceptor = () => {

    const { logout } = useAuth();

    /**
     * 토큰이 유효하지 않을 경우 로그아웃 처리 (Refresh Token이 만료된 경우)
     * @param response 
     * @returns 
     */
    const resResInterceptor = async (response) => {
        if (response.data && response.data.code === 401) {

            logout();
            
            return Promise.reject(response);
        }

        return response;
    }

    const resErrInterceptor = async (error) => {
        return Promise.reject(error);
    }

    useEffect(() => {

        const resInterceptor = axiosInstance.interceptors.response.use(
            response => resResInterceptor(response),
            error => resErrInterceptor(error),
        );

        return () => {
            axiosInstance.interceptors.response.eject(resInterceptor);
        }

    }, [])

    return { axiosInstance };
}

export default useAxiosInterceptor;