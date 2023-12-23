import React from "react";

/** @jsxImportSource @emotion/react */

const LoginInputBox = ({ style, icon, type, placeholder, backgroundColor = "#f2f2f2", state, setState }) => {

    return (
        <div
            style={{
                ...style,
                display: "flex",
                alignItems: "center",
                width: "100%",
                backgroundColor: backgroundColor,
                border: "trasparent",
                padding: "5px"
            }}
        >
            {React.cloneElement(icon, {
                style: {
                    marginRight: "10px",
                    fontSize: "1.1rem",
                    color: "rgba(0, 0, 0, 0.5)",
                }
            })}
            <input 
                css={{
                    flex: 1,
                    backgroundColor: "inherit",
                    color: "rgba(0, 0, 0, 0.8)",

                    "::placeholder": {
                        "font-size": "0.7rem",
                    }
                }}
                type={type}
                placeholder={placeholder}
                value={state}
                onChange={(e) => setState(e.target.value)}
            />
        </div>
    );
}

export default LoginInputBox;