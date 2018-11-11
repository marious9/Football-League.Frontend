import React from 'react';
import './LeagueCard.css'
const LeagueCard = props => {

    return (
        <div className="lg-card">
            <h2>{props.league.name}</h2>
            <p>Ilość drużyn: {props.league.quantity}</p>  
        </div>
    );
}

export default LeagueCard