import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useAuth } from './provider/AuthProvider';

const SidebarHeader = () => {

    const { userInfo, logout } = useAuth();

    const handleLogout = () => {
        logout();
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
                    src={userInfo.profileImageUrl}
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