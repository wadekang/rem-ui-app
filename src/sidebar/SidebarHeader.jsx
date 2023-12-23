import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction, selectUserInfo } from '../redux/auth/authSlice';

const SidebarHeader = () => {

    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);

    const handleLogout = () => {
        dispatch(logoutAction());
    }

    return (
        <div style={{
            display: "flex",
            height: "10%",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px",
        }}>
            <div style={{
                display: "flex",
                alignItems: "center",
            }}>
                <img 
                    src={userInfo.profileImageUrl ? userInfo.profileImageUrl : '/profile_image_default.png'}
                    alt="profile_image"
                    style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        marginRight: "10px",
                    }}
                />
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                }}>
                    <div
                        style={{
                            fontWeight: 700,
                            fontSize: "18px",
                        }}
                    >
                        {userInfo.name}
                    </div>
                    <div
                        style={{
                            fontSize: "12px",
                            color: "#808080",
                        }}
                    >
                        {userInfo.email}
                    </div>
                </div>
            </div>
            <SettingsOutlinedIcon 
                style={{
                    fontSize: "28px"
                }}
                onClick={handleLogout}
            />
        </div>
    );
}

export default SidebarHeader;