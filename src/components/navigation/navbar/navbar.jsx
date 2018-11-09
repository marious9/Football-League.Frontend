import React from 'react';
import "./navbar.css";
import Button from "../../UI/button/button";

const Navbar = ({ pushIntoRoute}) => (

    <div className="navbar">
        <div className="logo">TEAM MANAGEMENT</div>
        <div className="nav-btns">
            <Button 
                onClick={() => pushIntoRoute("/register")}
                name="Rejestracja"
                className="big-btn"
            />
            <Button
                onClick={() => pushIntoRoute("/login")}
                name="Logowanie"
                className="big-btn"
            />
        </div>
    </div>
);

export default Navbar;