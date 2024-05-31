import { useState } from "react"

const Button = ({ label, mouseOnColor, color, onClick }) => {
    const [background, setBackground] = useState(color);

    const style = {
        backgroundColor: background,
        width: 'fit-content',
        padding: 10,
        fontFamily: 'sans-serif',
        cursor: 'pointer',
    };

    const changeColor = () => background === color ? setBackground(mouseOnColor) : setBackground(color)

    return (
        <span
            style={style}
            onMouseEnter={() => changeColor()}
            onMouseLeave={() => changeColor()}
            onClick={onClick}
            >
            {label}
        </span>
    )
}

export default Button