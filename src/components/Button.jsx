import React from "react";

const Button = ({ callback, value }) => {
    return <button onClick={callback}>{value}</button>;
};

export default Button;
