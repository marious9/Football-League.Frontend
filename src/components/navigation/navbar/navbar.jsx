import React from 'react';
import "./navbar.css";
import Button from "../../UI/button/button";

const Navbar = (props) => (

    <div className="navbar">
        <div className="logo">Football Leagues Management</div>
        <div className="nav-btns">
        {!props.isLogged &&
            <Button
                onClick={() => props.pushIntoRoute("/login")}
                name="Logowanie"
                className="big-btn"
        /> }
        {props.isLogged &&
            <Button 
                onClick={() => props.logout()}
                name="Wyloguj się"
                className="big-btn"
            />
        }
        </div>
    </div>
);

export default Navbar;