import "../Main.css";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Fragment, useState } from "react";
import { Divider } from "@mui/material";

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LoginInputBox from "./LoginInputBox";
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import LoginSignUpDrawer from "./LoginSignUpDrawer";
import axiosInstance from "../config/AxiosInstance";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authSlice";

/** @jsxImportSource @emotion/react */

const Login = () => {

    const [signup, setSignup] = useState(false);
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const closeSignUpDrawer = () => setSignup(false);

    const handleFormLogin = () => {
        axiosInstance.post('/api/auth/login/form', {
            loginId: loginId,
            password: password
        }, {})
        .then(res => res.data)
        .then(data => {

            if (data.code === 200) {
                /* 
                    userId, name, email, profileImageUrl
                */
                dispatch(login({ ...data.data }));
            }
        })
    }

    const handleGoogleSuccess = (response) => {

        axiosInstance.post('/api/auth/login/google', {
            credential: response.credential
        }, {})
        .then(res => res.data)
        .then(data => {

            if (data.code === 200) {
                /* 
                    userId, name, email, profileImageUrl
                */
                dispatch(login({ ...data.data }));
            }
        })
    }

    return (
        <Fragment>
            <div 
                style={{
                    height: "100%",
                    width: "100%",

                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',

                    padding: "20px 60px",
                }}
            >
                <div style={{
                    marginBottom: "15px",
                }}>
                    <GoogleOAuthProvider clientId={process.env.REACT_APP_REM_GOOGLE_AUTH_CLIENT_ID}>
                        <GoogleLogin 
                            onSuccess={(response) => handleGoogleSuccess(response)}
                            onError={(error) => console.log('google login error', error)}
                            type="icon"
                            useOneTap
                        />
                    </GoogleOAuthProvider>
                </div>
                <Divider 
                    style={{
                        color: 'gray',
                        width: "100%",
                        marginBottom: "15px",
                    }}
                />
                <div
                    style={{
                        width: "100%",
                        marginBottom: "15px",
                    }}
                >
                    <LoginInputBox
                        style={{
                            marginBottom: "5px",
                        }}
                        icon={<EmailRoundedIcon />}
                        type="email"
                        placeholder="Email ID"
                        state={loginId}
                        setState={setLoginId}
                    />
                    <LoginInputBox
                        style={{
                            marginBottom: "5px",
                        }}
                        icon={<LockRoundedIcon />}
                        type="password"
                        placeholder="Password"
                        state={password}
                        setState={setPassword}
                    />
                    <div
                        style={{
                            width: "100%",
                            height: "34px",
                            padding: "5px",
                            backgroundColor: "#4DA4EA",
                            color: "white",
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                        onClick={handleFormLogin}
                    >
                        로그인
                    </div>
                </div>
                <Divider
                    style={{
                        color: 'gray',
                        width: "100%",
                        fontSize: "0.7rem",
                        marginBottom: "5px",
                    }}
                >
                    OR
                </Divider>
                <div
                    style={{
                        width: "100%",
                        textAlign: "center",
                        fontSize: "0.7rem",
                        color: 'gray',
                    }}
                >
                    계정이 없으신가요? <span style={{color: "#4DA4EA"}} onClick={() => setSignup(true)}>회원가입</span>
                </div>
            </div>
            <LoginSignUpDrawer 
                signup={signup}
                closeSignUpDrawer={closeSignUpDrawer}
            />
        </Fragment>
    )
}

export default Login;