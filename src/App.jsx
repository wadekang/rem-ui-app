import { Fragment } from "react";
import Main from "./Main";
import { useAuth } from "./provider/AuthProvider";
import Login from "./Login";

const App = () => {

	const { isLogin, onLoad } = useAuth();

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