import React from 'react';
import { connect } from 'react-redux';
import {getLeagueByIdActionCreator} from '../../store/actions/League';
import Spinner from '../../components/UI/spinner/spinner';
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
        console.log(this.props.match.params.id)
        setTimeout( () => {
            this.props.getLeagueById(this.props.match.params.id);
            this.setState({isLeagueLoading: false});
        }, 2000)        
    }

    render(){
        const {league} = this.props;
        const {isLeagueLoading} = this.state;

        const teams = league.teams && league.teams.map(team => {
            return (
                <div key={team.id}>
                    {team.name}
                </div>
            )
        });
        console.log(teams)

        return(
            <div>
                {isLeagueLoading ? <Spinner /> :
                    <div style={{width:'100%', height: '100%', marginTop:'100px', textAlign: 'center'}}>               
                        <h1>{league.name}</h1>                        
                        {teams}
                    </div> 
                }
                    
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {    
        league: state.League.league,
        loading: state.League.getLeaguesStatus
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getLeagueById: leagueId => dispatch(getLeagueByIdActionCreator(leagueId))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(LeagueContainer);