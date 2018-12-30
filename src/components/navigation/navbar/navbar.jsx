import React from 'react';
import "./navbar.css";
import Button from "../../UI/button/button";
//import UserIcon from "@material-ui/icons/AccountBox"

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
            <div>
                <Button 
                    onClick={() => props.logout()}
                    name="Wyloguj się"
                    className="big-btn"
                />
                {/* <UserIcon style={{}}fontSize="large"/> */}
                
                <Button 
                    onClick={() => props.pushIntoRoute("/account")}
                    name="Moje konto"
                    className="big-btn"
                />
            </div>
        }
        </div>
    </div>
);

export default Navbar;