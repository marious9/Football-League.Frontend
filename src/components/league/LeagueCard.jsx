import React from 'react';

const LeagueCard = props => {

    return (
        <div style={{backgroundColor:'green', display:'inline-block', marginRight:'10px', marginBottom:'10px', height:'100px', width:'200px'}}>
            <h2>{props.league.name}</h2>   
        </div>
    );
}

export default LeagueCard