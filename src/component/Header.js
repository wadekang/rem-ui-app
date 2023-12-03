import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { Fragment, useContext, useEffect, useState } from "react";
import HeaderDatePicker from "./HeaderDatePicker";
import { SelectedContext } from "./Main";

const Header = ({ toggleSidebar }) => {

    const { selectedDate } = useContext(SelectedContext);

    const [datePick, setDatePick] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {

        if (datePick) {
            setIsDrawerOpen(true);
        } else {
            setTimeout(() => {
                setIsDrawerOpen(false);
            }, 150);
        }

    }, [datePick])

    const toggleDatePick = () => setDatePick(!datePick);

    const onClickMenu = () => {
        toggleSidebar();
        setDatePick(false);
    }

	return (
		<Fragment>
            <HeaderDatePicker 
                datePick={datePick}
                toggleDatePick={toggleDatePick}
            />
            <div 
                style={{ 
                    height: "40px", 
                    padding: "3px 15px",
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    
                    backgroundColor: isDrawerOpen ? "rgb(63, 61, 67)" : "white",
                    color: isDrawerOpen ? "white": "black",

                    zIndex: 4,
                    position: "absolute",
                    left: 0,
                    top: 0,
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
                        onClick={onClickMenu}
                    />
                    
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                        onClick={toggleDatePick}
                    >
                        <div
                            style={{
                                textAlign: "center",
                                fontWeight: 800,
                                fontSize: 18,
                                marginRight: "5px",
                            }}
                        >
                            {selectedDate.year}. {selectedDate.month + 1}
                        </div>
                        {isDrawerOpen 
                        ? (
                            <KeyboardArrowUpRoundedIcon />
                        )
                        : (
                            <KeyboardArrowDownRoundedIcon />
                        )
                        }
                    </div>
                </div>
                <div>
                    <SearchRoundedIcon 
                        style={{ }}
                        onClick={() => {
                            setDatePick(false);
                        }}
                    />
                </div>
            </div>
        </Fragment>
	);
};

export default Header;
