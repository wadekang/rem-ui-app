import { logoutAction } from "../redux/auth/authSlice";

export default function setAxios(axios, store) {
    axios.interceptors.response.use(
        response => {
            /**
             * 토큰 만료 시 401 반환되기 때문에 로그아웃 처리
             */
            if (response.data && response.data.code === 401) {
                store.dispatch(logoutAction());
                return Promise.reject(response);
            }
            return response;
        },
        error => {
            return Promise.reject(error);
        }
    )
}