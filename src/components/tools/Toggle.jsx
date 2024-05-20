import { useState } from "react";

const Toggle = ({ label, children }) => {
    const [visible, changeVisibility] = useState(false);

    const style = {
        display: 'flex'
    }

    const handleClick = () => changeVisibility(!visible);

    return (
        <div style={style}>
            {
                visible
                ? children
                : <p>{label}</p>
            }
            <button onClick={handleClick}>↓</button>
        </div>
    )
};

export default Toggle;