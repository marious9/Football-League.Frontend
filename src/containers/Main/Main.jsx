import React from 'react';
import { connect } from 'react-redux';
import LeagueCard from '../../components/league/LeagueCard';
import {getLeaguesActionCreator} from '../../store/actions/League';
import { Link } from 'react-router-dom';
import './Main.css';
import Spinner from '../../components/UI/spinner/spinner';

class Main extends React.Component{
    state = {
        isLeaguesLoading: true
    }

    componentDidMount(){
        setTimeout( () => {
            this.props.getLeagues();
            this.setState({isLeaguesLoading: false});
        }, 2000)    
    }

    render(){
        const {leagues, history} = this.props;
        const {isLeaguesLoading} = this.state;
        console.log(history)
        return(
            <div>
            {isLeaguesLoading ? <Spinner /> :
                <div className="main-container">
                    <h1>Hello, you will see here some leagues !!</h1>
                    {leagues.map(league => {
                        return (
                            <Link to={`${history.location.pathname}/league/${league.id}`} key={league.id}>
                                <LeagueCard key={league.id} league={league} />
                            </Link>
                        )})
                    } 
                </div>
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