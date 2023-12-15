import { useAuth } from "./provider/AuthProvider";
import "./Main.css";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import useAxiosInterceptor from "./config/useAxiosInterceptor";

const Login = () => {

    const { login } = useAuth();
    const { axiosInstance } = useAxiosInterceptor();

    useEffect(() => {

    }, [])

    const handleSuccess = (response) => {

        axiosInstance.post('/api/auth/login/google', {
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
        <GoogleOAuthProvider clientId={process.env.REACT_APP_REM_GOOGLE_AUTH_CLIENT_ID}>
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
        </GoogleOAuthProvider>
    )
}

export default Login;