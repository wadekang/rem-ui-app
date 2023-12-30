/** @jsxImportSource @emotion/react */

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction, selectUserInfo } from '../redux/auth/authSlice';
import styled from '@emotion/styled';

const SidebarHeaderContainer = styled.div`
    height: 80px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 10px;
`;

const Div = styled.div`
    display: flex;
    align-items: center;
`;

const Avatar = styled.img`
    width: 35px;
    height: 35px;

    border-radius: 50%;

    margin-right: 10px;
`;

const UserInfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const UserName = styled.div`
    font-weight: 700;
    font-size: 18px;
`;

const UserEmail = styled.div`
    font-size: 12px;
    color: #808080;
`;

const SidebarHeader = () => {

    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);

    const handleLogout = () => {
        dispatch(logoutAction());
    }

    return (
        <SidebarHeaderContainer>
            <Div>
                <Avatar 
                    src={userInfo.profileImageUrl ? userInfo.profileImageUrl : '/profile_image_default.png'}
                    alt="profile_image"
                />
                <UserInfoDiv>
                    <UserName>
                        {userInfo.name}
                    </UserName>
                    <UserEmail>
                        {userInfo.email}
                    </UserEmail>
                </UserInfoDiv>
            </Div>
            <SettingsOutlinedIcon 
                css={{
                    fontSize: "28px"
                }}
                onClick={handleLogout}
            />
        </SidebarHeaderContainer>
    );
}

export default SidebarHeader;