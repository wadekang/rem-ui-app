import { Fragment, useEffect } from "react";
import Main from "./Main";
import { useAuth } from "./provider/AuthProvider";
import Login from "./Login";

const App = () => {

	const { isLogin, userInfo } = useAuth();

	useEffect(() => {

		console.log('userInfo', userInfo);

	}, [userInfo])

	return (
		<Fragment>
			{isLogin ? (
				<Main />
			) : (
				<Login />
			)}
		</Fragment>
	);
};

export default App;