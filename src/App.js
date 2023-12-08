import { Fragment, useEffect, useState } from "react";
import Main from "./Main";
import { useAuth } from "./provider/AuthProvider";
import Login from "./Login";
import axiosInstance from "./config/axiosInstance";

const App = () => {

	const [onLoad, setOnLoad] = useState(true);
	const { isLogin, login } = useAuth();

	/**
     * 사이트 접속 시 토큰이 유효한지 검증하여 로그인 여부 결정
     */
    useEffect(() => {

        axiosInstance.get('/api/auth/isTokenValid', {})
        .then(res => res.data)
        .then(data => {

            if (data.code === 200) {
                login(data.data);
            }
        })
		.finally(() => setOnLoad(false));
    }, [])
	
	return (
		<Fragment>
			{onLoad 
				? null 
				: isLogin 
					? <Main /> 
					: <Login />
			}
		</Fragment>
	);
};

export default App;