import React from 'react';
import LeagueCard from '../../components/league/LeagueCard';
class Main extends React.Component{
    state = {}
    render(){

        return(
            <div style={{width:'100%', height: '100%', marginTop:'100px', textAlign: 'center'}}>
                <h1>Hello, you will see here some leagues !!</h1>
                <LeagueCard />
                <LeagueCard />
                <LeagueCard />
                <LeagueCard />
                <LeagueCard />
                <LeagueCard />
                <LeagueCard />
                <LeagueCard />
                <LeagueCard />
            </div>
        );
    }
}
export default Main;