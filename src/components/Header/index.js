import React from "react";
import "./styles.css";
import Logo from "../../assets/logo.png";

const Header = () => {
    return (
        <div className="nav">
            <img src={Logo} width="100" />
        </div>
    )
}

export default Header;