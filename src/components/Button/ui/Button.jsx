import {useState} from "react";

import "../style/style.css"

export const Button = ({title, onEvent}) => {
    const [isActive, setIsActive] = useState(false)

    const onClick = () => {
        setIsActive(!isActive);
        onEvent(!isActive)
    }

    return (
        <button className={`button ${isActive ? 'button__active' : ''}`}  onClick={onClick}>
            {title}
        </button>
    )
}
