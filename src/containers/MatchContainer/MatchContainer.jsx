import React from 'react';
import { connect } from 'react-redux';
import { getMatchesActionCreator, addMatchActionCreator } from '../../store/actions/Match';
import { getLeagueByIdActionCreator } from '../../store/actions/League';
import Spinner from '../../components/UI/spinner/spinner';
import AddButton from '../../components/UI/addButton/AddButton';
import AddMatchModal from '../../components/match/AddMatchModal/AddMatchModal';
import MatchesTable from '../../components/match/MatchesTable/MatchesTable';

class MatchContainer extends React.Component{
    state = {
        isMatchLoading: true,
        openModal: false,
        formItems: [],
        matches: [],
        selectTeams: [],
        currentHostId: null,
        currentAwayId: -null,
        currentHostError: '',
        currentAwayError: ''
    }

    setHostId = (id) => {
        this.setState({currentHostId: id });
        if(id !== this.state.currentAwayId){
            this.setState({currentHostError: '', currentAwayError: ''})
        }
    }

    setAwayId = (id) => {
        this.setState({currentAwayId: id });
        if(this.state.currentHostId !== id){
            this.setState({currentHostError: '', currentAwayError: ''})
        }
    }

    setFields = (name, formItems) => { 
        this.setState({[name]: formItems});
      }

    onOpenModal = () => {
        this.setState({ openModal: true, selectTeams: this.getLeagueTeamsToSelect()});
    };
     
    onCloseModal = () => {
        this.setState({ openModal: false });
    };


    componentDidMount(){
        const leagueId = this.props.match.params.id;
        setTimeout( () => {
            this.props.getMatches(leagueId);    
            this.props.getLeague(leagueId)
            this.setState({isMatchLoading: false, matches: this.props.matches});
        }, 2000)        
    }

    // componentDidUpdate(prevProps) {
    //     if(prevProps.addMatchResult !== true && this.props.addMatchResult === true){
    //         console.log('halo')
    //         this.setState({openModal: false})
    //     }
    // }

    getLeagueTeamsToSelect() {
        const {league} = this.props;
        if(Object.keys(league).length === 0 ) return [];
        let teams = [];
        league.teams && league.teams.map(team => teams.push({label: team.name, value: team.id}))
        this.setState({currentHostId: teams[0].value, currentAwayId: teams[0].value})

        return teams;
    }

    renderMatchesRound() {
        const {matches} = this.props;
        const sortedMatches = matches.length > 0 ? matches.sort((match1, match2) => match2.round - match1.round): [];
        let matchesSortedByRound=[];
        if(sortedMatches.length > 0) {
            const minRound = sortedMatches[sortedMatches.length-1].round;
            const maxRound = sortedMatches[0].round;
            for(let i=maxRound;i>=minRound;i--){
                const roundMatches = sortedMatches.filter(match => match.round === i);
                matchesSortedByRound.push(roundMatches)           
            }
        }
        return matchesSortedByRound;
    }

    pushIntoRoute = path => {
        this.props.history.push(path);
    }

    validateSelectTeams() {
        const {currentHostId, currentAwayId, currentHostError, currentAwayError} = this.state;
        if(currentHostId === currentAwayId) {
            const errMsg = "Wybrane drużyny są takie same";
            this.setState({currentHostError: errMsg, currentAwayError: errMsg})
        }
        if(currentHostError  || currentAwayError) {
            return false
        }
        return true;
    }

    addMatch = () => {
        const {currentHostId, currentAwayId, currentHostError, currentAwayError} = this.state;
        this.validateSelectTeams();
        if (!(currentHostError  || currentAwayError)) {
            this.props.addMatch(this.state.formItems, this.props.match.params.id, {hostId: currentHostId, awayId: currentAwayId})
        }
    }

    render(){
        const {addMatchResult, addMatchErrors } = this.props;
        const {isMatchLoading, openModal, formItems} = this.state;
        const sortedMatches = this.renderMatchesRound();
        const league = sortedMatches.length > 0 ? sortedMatches[0].league : null;
        const id = this.props.match.params.id;
        let rounds = sortedMatches.length;
        console.log(this.state)
        return(
            <div>
                {isMatchLoading ? <Spinner /> :
                    <div style={{width:'100%', top:"100px", textAlign: 'center', margin: 0, position:"relative"}}>                    
                    <h2>{league && "Mecze ligii: " + league.name}</h2>
                    <AddButton left tooltip="Dodaj mecz" action={this.onOpenModal}/>  
                    <AddMatchModal
                        selectTeams={this.state.selectTeams}
                        currentHostError={this.state.currentHostError}
                        currentAwayError={this.state.currentAwayError}                        
                        setHostId={this.setHostId}
                        setAwayId={this.setAwayId}
                        currentHostId={this.state.currentHostId}
                        currentAwayId={this.state.currentAwayId}
                        selectTeams={this.state.selectTeams}
                        leagueId={id}
                        addMatchResult={addMatchResult}
                        addMatchErrors={addMatchErrors} 
                        openModal={openModal} 
                        closeModal={this.onCloseModal} 
                        addMatch={this.addMatch} 
                        setFields={this.setFields} 
                        formItems={formItems} />
                        {sortedMatches.length > 0 ? sortedMatches.map((queue,i)=>
                            <MatchesTable 
                                key={i} 
                                onOpenModal={this.onOpenModal}
                                round={rounds - i}
                                matches={queue}
                                location={this.props.history.location.pathname}
                                pushIntoRoute={this.pushIntoRoute}
                                 />) : <h3>Brak meczów w lidze.</h3>}

                    </div> 
                }
                    
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        addMatchResult: state.Match.addMatchResult,
        addMatchErrors: state.Match.addMatchErrors,
        matches: state.Match.matches,
        league: state.League.league    
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getLeague: leagueId => dispatch(getLeagueByIdActionCreator(leagueId)),
        getMatches: leagueId => dispatch(getMatchesActionCreator(leagueId)),
        addMatch: (formItems, leagueId, matchTeams) => dispatch(addMatchActionCreator(formItems, leagueId, matchTeams))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MatchContainer);