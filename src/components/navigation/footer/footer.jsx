import React from 'react';
import "./footer.css"
import Button from "../../UI/button/button";

const Footer = ({ pushIntoRoute}) => (

    <div className="footer">
        <div className="footer-btns">
            <Button 
                onClick={() => pushIntoRoute("/register")}
                name="O nas"
                className="footer-btn"
            />
            <Button
                onClick={() => pushIntoRoute("/login")}
                name="Kontakt"
                className="footer-btn"
            />
            <Button
                onClick={() => pushIntoRoute("/login")}
                name="Pomoc"
                className="footer-btn"
            />
        </div>
    </div>
);

export default Footer;