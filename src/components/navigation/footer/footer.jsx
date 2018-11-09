import React from 'react';
import "./footer.css"
import {Link} from 'react-router-dom';

const Footer = () => (
    <div className="footer">
        <Link to="/main" className="link">Strona główna</Link>
        <Link to="/" className="link">Kontakt</Link>
    </div>
);

export default Footer;