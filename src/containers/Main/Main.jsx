import React from 'react';
import { connect } from 'react-redux';
import LeagueCard from '../../components/league/LeagueCard';
import {getLeaguesActionCreator} from '../../store/actions/League'
class Main extends React.Component{
    state = {
        isLeaguesLoading: true
    }

    componentDidMount(){
        this.props.getLeagues();
        this.setState({isLeaguesLoading: false})
    }

    render(){
        const {leagues} = this.props;
        return(
            <div style={{width:'100%', height: '100%', marginTop:'100px', textAlign: 'center'}}>
                <h1>Hello, you will see here some leagues !!</h1>
                {leagues.map(league => {
                    return (
                        <LeagueCard key={league.id} league={league} />
                    )})
                }      
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {    
        leagues: state.League.leagues
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getLeagues: () => dispatch(getLeaguesActionCreator())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);