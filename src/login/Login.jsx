/** @jsxImportSource @emotion/react */

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
import styled from '@emotion/styled/macro'

const LoginContainer = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 20px 60px;
`;

const OAuthChild = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 15px;
`;

const LoginBoxChild = styled.div`
    width: 100%;
    margin-bottom: 15px;

    & div:not(:last-child) {
        margin-bottom: 5px;
    }
`;

const LoginButton = styled.button`
    width: 100%;
    height: 34px;
    padding: 5px;
    background-color: #4DA4EA;
    color: white;
    text-align: center;
    font-weight: bold;
`;

const SignUpChild = styled.div`
    width: 100%;
    text-align: center;
    font-size: 0.7rem;
    color: gray;

    & > span {
        color: #4DA4EA;
        cursor: pointer;
    }
`;

const StyledDivider = styled(Divider)`
    color: gray;
    width: 100%;
    margin-bottom: 15px;

    font-size: 0.7rem;
`;

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
            <LoginContainer>
                <OAuthChild>
                    <GoogleOAuthProvider clientId={process.env.REACT_APP_REM_GOOGLE_AUTH_CLIENT_ID}>
                        <GoogleLogin 
                            onSuccess={(response) => handleGoogleSuccess(response)}
                            onError={(error) => console.log('google login error', error)}
                            type="icon"
                            useOneTap
                        />
                    </GoogleOAuthProvider>
                </OAuthChild>
                <StyledDivider />
                <LoginBoxChild>
                    <LoginInputBox
                        icon={<EmailRoundedIcon />}
                        type="email"
                        placeholder="Email ID"
                        state={loginId}
                        setState={setLoginId}
                    />
                    <LoginInputBox
                        icon={<LockRoundedIcon />}
                        type="password"
                        placeholder="Password"
                        state={password}
                        setState={setPassword}
                    />
                    <LoginButton
                        onClick={handleFormLogin}
                    >
                        로그인
                    </LoginButton>
                </LoginBoxChild>
                <StyledDivider>
                    OR
                </StyledDivider>
                <SignUpChild>
                    계정이 없으신가요? <span onClick={() => setSignup(true)}>회원가입</span>
                </SignUpChild>
            </LoginContainer>
            <LoginSignUpDrawer 
                signup={signup}
                closeSignUpDrawer={closeSignUpDrawer}
            />
        </Fragment>
    )
}

export default Login;