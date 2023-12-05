import { useAuth } from "./provider/AuthProvider";
import "./Main.css";

const Login = () => {

    const { login } = useAuth();

    const handleLogin = () => {

        login({
            userId: 1,
            name: 'John Doe',
            email: 'user1@test.com',
            role: 'ROLE_USER',
        })
    }

    return (
        <div 
            className="main-body"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login;