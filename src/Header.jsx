/** @jsxImportSource @emotion/react */

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { Fragment, useEffect, useState } from "react";
import HeaderDatePicker from "./HeaderDatePicker";
import { useSelector } from "react-redux";
import { selectSelectedDate } from "./redux/date/dateSlice";
import styled from "@emotion/styled";

const HeaderContainer = styled.div`
    height: 40px;
    width: 100%;
    padding: 3px 15px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: ${props => props.isDrawerOpen ? "rgb(63, 61, 67)" : "white"};
    color: ${props => props.isDrawerOpen ? "white": "black"};

    z-index: 4;
    position: absolute;
    left: 0;
    top: 0;
`;

const Div = styled.div`
    display: flex;
    align-items: center;
`

const DateDiv = styled.div`
    text-align: center;
    font-weight: 800;
    font-size: 18px;
    margin-right: 5px;
`;

const Header = ({ toggleSidebar }) => {

    const selectedDate = useSelector(selectSelectedDate);

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
            <HeaderContainer
                isDrawerOpen={isDrawerOpen}
            >
                <Div>
                    <MenuRoundedIcon 
                        css={{
                            marginRight: "10px",
                        }}
                        onClick={onClickMenu}
                    />
                    
                    <Div
                        onClick={toggleDatePick}
                    >
                        <DateDiv>
                            {selectedDate.year}. {selectedDate.month + 1}
                        </DateDiv>
                        {isDrawerOpen 
                        ? (
                            <KeyboardArrowUpRoundedIcon />
                        )
                        : (
                            <KeyboardArrowDownRoundedIcon />
                        )
                        }
                    </Div>
                </Div>
                <div>
                    <SearchRoundedIcon
                        onClick={() => {
                            setDatePick(false);
                        }}
                    />
                </div>
            </HeaderContainer>
        </Fragment>
	);
};

export default Header;
