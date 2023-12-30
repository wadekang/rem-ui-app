/** @jsxImportSource @emotion/react */

import { useEffect, useState, Fragment } from "react";

import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import { CirclePicker } from "react-color";
import { colors } from "./CalendarWeekEventsRowColorMap";
import styled from "@emotion/styled";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

const ColorDiv = styled.div`
    display: flex;
    align-items: center;

    margin-bottom: 20px;
`;

const ColorDivItem = styled.div`
    width: 1rem;
    height: 1rem;

    border-radius: 50%;

    background-color: ${(props) => props.color};
`;

const CalendarColorPicker = ({ color, setColor }) => {

    const [colorPicker, setColorPicker] = useState(false);

    const toggleColorPicker = () => setColorPicker(!colorPicker);

    return (
        <Fragment>
            <Accordion
                css={{
                    boxShadow: "none",

                    '&::before': {
                        display: "none",
                    }
                }}
                expanded={colorPicker}
                onChange={toggleColorPicker}
            >
                <AccordionSummary
                    css={{
                        padding: "0px",

                        '& .MuiAccordionSummary-content': {
                            margin: "0px",
                        },

                        '& .Mui-expanded': {
                            margin: "0px",
                        }
                    }}
                >
                    <ColorDiv>
                        <PaletteRoundedIcon 
                            css={{
                                marginRight: "20px",
                            }}
                            onClick={toggleColorPicker}
                        />
                        <ColorDivItem
                            color={color}
                            onClick={toggleColorPicker}
                        />
                    </ColorDiv>
                </AccordionSummary>
                <AccordionDetails
                    css={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                        padding: "0px",
                        marginBottom: "5px",
                    }}
                >
                    <CirclePicker
                        styles={{
                            default: {
                                card: {
                                    height: 168,
                                }
                            }
                        }}
                        color={color}
                        colors={colors}
                        onChangeComplete={(color) => setColor(color.hex)}
                    />
                </AccordionDetails>
            </Accordion>
        </Fragment>
    );
}

export default CalendarColorPicker;