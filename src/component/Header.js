import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { useState } from "react";

const Header = ({ view, setView, toggleSidebar }) => {

    const [datePick, setDatePick] = useState(false);

	return (
		<div 
            style={{ 
                height: "40px", 
                padding: "3px 7px",
                borderBottom: "1px solid #e0e0e0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
			<div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <MenuRoundedIcon 
                    style={{
                        marginRight: "10px",
                    }}
                    onClick={toggleSidebar}
                />
                
                <div
                    style={{
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: 16,
                        marginRight: "5px",
                    }}
                >
                    2023. 11
                </div>
                {datePick 
                ? (
                    <KeyboardArrowUpRoundedIcon 
                        onClick={() => setDatePick(false)}
                    />
                )
                : (
                    <KeyboardArrowDownRoundedIcon 
                        onClick={() => setDatePick(true)}
                    />
                )
                }
            </div>
            <div>
                <SearchRoundedIcon 
                    style={{ marginRight: "10px" }}
                    onClick={() => setView("search")}
                />
                {view === "list" 
                ? (
                    <CalendarMonthRoundedIcon 
                        onClick={() => setView("calendar")} 
                    />
                ) 
                : (
                    <ListRoundedIcon 
                        onClick={() => setView("list")} 
                    />
                )
                }
            </div>
		</div>
	);
};

export default Header;
