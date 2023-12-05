import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const SidebarHeader = () => {
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
                    src={process.env.PUBLIC_URL + '/profile_image_default.png'}
                    alt="profile_image"
                    style={{
                        width: "55px",
                        height: "55px",
                        borderRadius: "50%",
                        marginRight: "2px",
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
                        강현석
                    </div>
                    <div
                        style={{
                            fontSize: "12px",
                            color: "#808080",
                        }}
                    >
                        hsuk6032@gmail.com
                    </div>
                </div>
            </div>
            <SettingsOutlinedIcon 
                style={{
                    fontSize: "28px"
                }}
            />
        </div>
    );
}

export default SidebarHeader;