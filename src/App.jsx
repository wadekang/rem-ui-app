import Main from "./Main";
import Login from "./login/Login";
import "./Main.css";
import { useEffect } from "react";
import setAxios from "./config/AxiosInterceptor";
import axiosInstance from "./config/AxiosInstance";
import store from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLogin, selectOnLoad, tokenValidOnLoad } from "./redux/auth/authSlice";

const App = () => {
	
	const isLogin = useSelector(selectIsLogin);
	const onLoad = useSelector(selectOnLoad);

	const dispatch = useDispatch();

	useEffect(() => {

		// Axios Interceptor Setting
		setAxios(axiosInstance, store);

		// token validation on load
		dispatch(tokenValidOnLoad());

        // iPhone Safari에서 주소창을 제외한 화면 높이를 100vh로 설정
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        window.addEventListener('resize', resizeEvnetListener);
        
        return () => {
            window.removeEventListener('resize', resizeEvnetListener);
        }

    }, [])

    // resize 이벤트가 발생할 때마다 vh를 다시 계산하여 설정
    const resizeEvnetListener = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

	return (
		<div
			className="main-body"
		>
			{onLoad 
				? null 
				: isLogin 
					? <Main /> 
					: <Login />
			}
		</div>
	);
};

export default App;