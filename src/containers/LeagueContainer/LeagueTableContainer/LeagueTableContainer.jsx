import React from 'react';
import { connect } from 'react-redux';
import {getLeagueByIdActionCreator, getLeagueTableActionCreator} from '../../../store/actions/League';
import Spinner from '../../../components/UI/spinner/spinner';
import LeagueTable from '../../../components/league/LeagueTable/LeagueTable';

class LeagueTableContainer extends React.Component{
    state = {
        isLeagueLoading: true
    }

    componentDidMount(){
        this.props.getLeagueTable(this.props.match.params.id)
        setTimeout( () => {
            this.props.getLeagueById(this.props.match.params.id);
            
            this.setState({isLeagueLoading: false});
        }, 2000)        
    }

    render(){
        const {league, leagueTable} = this.props;
        const {isLeagueLoading} = this.state;
        
        return(
            <div>
                {isLeagueLoading ? <Spinner /> :
                    <div >               
                        <h1>{league.name}</h1>
                        <LeagueTable teams={leagueTable.length > 0 ? leagueTable : ''} league={league} />                                                                
                    </div> 

                }
                    
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {    
        league: state.League.league,
        leagueTable: state.League.leagueTable
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getLeagueById: leagueId => dispatch(getLeagueByIdActionCreator(leagueId)),
        getLeagueTable: leagueId => dispatch(getLeagueTableActionCreator(leagueId))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(LeagueTableContainer);