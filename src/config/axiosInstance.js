import axios from "axios";
import { useAuth } from "../provider/AuthProvider";

// axios 공통 설정
const axiosInstance = axios.create({
    // 추후 nginx 통해 API, File 서버로 라우팅
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
});

axiosInstance.interceptors.request.use(
    response => response,
    async error => {
        if (error.response && error.response.data.status === 401) {
            // 토큰이 없거나 만료된 경우이므로 로그인 페이지로 이동 (로그아웃 처리0)

            const { logout } = useAuth();
            logout();
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;