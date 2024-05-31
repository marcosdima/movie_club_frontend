import { useState } from "react";

const Toggle = ({ label, children }) => {
    const [visible, changeVisibility] = useState(false);

    const handleClick = () => changeVisibility(!visible);

    return (
        <div className="toggle">
            {
                visible
                ? children
                : <p>{label}</p>
            }
            <button className="toggle-button" onClick={handleClick}>{visible ? '↑' : '↓'}</button>
        </div>
    )
};

export default Toggle;