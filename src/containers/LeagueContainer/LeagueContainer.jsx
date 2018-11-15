import React from 'react';
import { connect } from 'react-redux';
import {getLeagueByIdActionCreator, getLeagueTableActionCreator} from '../../store/actions/League';
import Spinner from '../../components/UI/spinner/spinner';
import LeagueTable from '../../components/league/LeagueTable/LeagueTable';
import AddButton from '../../components/UI/addButton/AddButton';

class LeagueContainer extends React.Component{
    state = {
        isLeagueLoading: true
    }

    // static getDerivedStateFromProps(props, state) {
    //     if(props.league !== state.league){
    //         props.getLeagueById(props.match.params.id);
    //     }
    //     return null;
    // }

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


        const teams = league.teams && league.teams.map(team => {
            return (
                <div key={team.id}>
                    {team.name}
                    
                </div>                
            )
        });

        return(
            <div>
                {isLeagueLoading ? <Spinner /> :
                    <div style={{width:'100%', height: '100%', marginTop:'100px', textAlign: 'center'}}>               
                        <h1>{league.name}</h1>                                               
                        {teams}
                        <LeagueTable teams={leagueTable} />
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
export default connect(mapStateToProps, mapDispatchToProps)(LeagueContainer);