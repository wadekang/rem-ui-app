/** @jsxImportSource @emotion/react */

import Main from "./Main";
import Login from "./login/Login";
import { useEffect, useState } from "react";
import setAxios from "./config/AxiosInterceptor";
import axiosInstance from "./config/AxiosInstance";
import store from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLogin, selectOnLoad, tokenValidOnLoad } from "./redux/auth/authSlice";
import { CircularProgress } from "@mui/material";
import styled from "@emotion/styled";

const AppContainer = styled.div`
	width: 100vw;
	height: ${props => props.vh * 100}px;

	overflow: hidden;

	margin: 0;
	padding: 0;
`;

const App = () => {
	
	const isLogin = useSelector(selectIsLogin);
	const onLoad = useSelector(selectOnLoad);

	const [vh, setVh] = useState(0);

	const dispatch = useDispatch();

	useEffect(() => {

		// Axios Interceptor Setting
		setAxios(axiosInstance, store);

		// token validation on load
		dispatch(tokenValidOnLoad());

        // iPhone Safari에서 주소창을 제외한 화면 높이를 100vh로 설정
		setVh(window.innerHeight * 0.01);

        window.addEventListener('resize', resizeEvnetListener);
        
        return () => {
            window.removeEventListener('resize', resizeEvnetListener);
        }

    }, [])

    // resize 이벤트가 발생할 때마다 vh를 다시 계산하여 설정
    const resizeEvnetListener = () => {
		setVh(window.innerHeight * 0.01);
    }

	return (
		<AppContainer vh={vh}>
			{onLoad 
				? <CircularProgress /> 
				: isLogin 
					? <Main /> 
					: <Login />
			}
		</AppContainer>
	);
};

export default App;