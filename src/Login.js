import { useAuth } from "./provider/AuthProvider";
import "./Main.css";
import { GoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import axiosInstance from "./config/axiosInstance";

const Login = () => {

    const { login } = useAuth();

    useEffect(() => {

    }, [])

    const handleSuccess = (response) => {

        axiosInstance.post('http://localhost:12012/api/auth/login/google', {
            credential: response.credential
        }, {})
        .then(res => res.data)
        .then(data => {

            if (data.code === 200) {
                login({
                    /* 
                        userId, name, email, profileImageUrl
                    */
                    ...data.data,
                })
            }
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
            <GoogleLogin 
                onSuccess={(response) => handleSuccess(response)}
                onError={(error) => console.log('google login error', error)}
                width={"220px"}
                useOneTap
            />
        </div>
    )
}

export default Login;