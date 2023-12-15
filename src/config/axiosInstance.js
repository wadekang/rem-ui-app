import axios from "axios";

// axios 공통 설정
const axiosInstance = axios.create({
    // 추후 nginx 통해 API, File 서버로 라우팅
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
    },
});

export default axiosInstance;