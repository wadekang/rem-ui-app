/** @jsxImportSource @emotion/react */

import { useEffect, useState, Fragment } from "react";

import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import { CirclePicker } from "react-color";
import { colors } from "./CalendarWeekEventsRowColorMap";

const CalendarColorPicker = ({ color, setColor }) => {

    const [colorPicker, setColorPicker] = useState(false);

    const toggleColorPicker = () => setColorPicker(!colorPicker);

    return (
        <Fragment>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <PaletteRoundedIcon 
                    style={{
                        marginRight: "20px",
                    }}
                    onClick={toggleColorPicker}
                />
                <div
                    style={{
                        borderRadius: "50%",
                        backgroundColor: color,
                        width: "1rem",
                        height: "1rem"
                    }}
                    onClick={toggleColorPicker}
                />
            </div>
            <div
                css={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                    marginBottom: colorPicker ? "20px" : "0px",

                    visibility: colorPicker ? "visible" : "hidden",
                    opacity: colorPicker ? 1 : 0,
                    transition: "opacity 0.3s, visibility 0.3s ease",
                }}
            >
                <CirclePicker
                    styles={{
                        default: {
                            card: {
                                visibility: colorPicker ? "visible" : "hidden",
                                maxHeight: colorPicker ? 168 : 0,
                                transition: "max-height 0.3s, visibility 0.3s ease",
                            }
                        }
                    }}
                    color={color}
                    colors={colors}
                    onChangeComplete={(color) => setColor(color.hex)}
                />
            </div>
        </Fragment>
    );
}

export default CalendarColorPicker;