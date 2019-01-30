import React from 'react';
import "./navbar.css";
import Button from "../../UI/button/button";
//import UserIcon from "@material-ui/icons/AccountBox"

const Navbar = (props) => (

    <div className="navbar">
        <div className="logo" onClick={() => props.pushIntoRoute('/main')}>Zarządzanie turniejami piłki nożnej</div>
        <div className="nav-league-btns">
        {props.leagueId && 
        <div>
            <Button
            onClick={() => props.pushIntoRoute(`/main/league/${props.leagueId}`)}
            name="Liga"
            className="mid-btn"
            />
            <Button
            onClick={() => props.pushIntoRoute(`/main/league/${props.leagueId}/table`)}
            name="Tabela"
            className="mid-btn"
            />
            <Button
            onClick={() => props.pushIntoRoute(`/main/league/${props.leagueId}/teams`)}
            name="Drużyny"
            className="mid-btn"
            />            
            <Button
            onClick={() => props.pushIntoRoute(`/main/league/${props.leagueId}/statistics`)}
            name="Statystyki"
            className="mid-btn"
            />
            <Button
            onClick={() => props.pushIntoRoute(`/main/league/${props.leagueId}/match`)}
            name="Mecze"
            className="mid-btn"
            />
        </div>
        }
        </div>
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