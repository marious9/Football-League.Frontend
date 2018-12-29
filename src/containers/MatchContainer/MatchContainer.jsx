import React from 'react';
import { connect } from 'react-redux';
import { getMatchesActionCreator, addMatchActionCreator } from '../../store/actions/Match';
import { getLeagueByIdActionCreator, generateScheduleActionCreator, generateSchedule } from '../../store/actions/League';
import Spinner from '../../components/UI/spinner/spinner';
import AddButton from '../../components/UI/addButton/AddButton';
import AddMatchModal from '../../components/match/AddMatchModal/AddMatchModal';
import MatchesTable from '../../components/match/MatchesTable/MatchesTable';
import {Button} from '@material-ui/core/';
import ServerError from '../../components/UI/server-error-prompt/server-error';

class MatchContainer extends React.Component{
    state = {
        isMatchLoading: true,
        openModal: false,
        formItems: [],
        matches: [],
        selectTeams: [],
        currentHostId: null,
        currentAwayId: null,
        currentHostError: '',
        currentAwayError: ''
    }

    generateSchedule = () => {
        this.props.generateSchedule(this.props.match.params.id)
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
        this.props.clearGenerateSchedule();
        setTimeout( () => {
            this.props.getMatches(leagueId);    
            this.props.getLeague(leagueId);            
            this.setState({isMatchLoading: false});  
        }, 2000)      
    }

    componentDidUpdate(prevProps) {
        const leagueId = this.props.match.params.id;
        if(this.props.addMatchResult && this.props.addMatchErrors !== prevProps.addMatchErrors){
            this.setState({openModal: false})
            this.props.getMatches(leagueId);
        }

        if(this.props.generateScheduleResult && this.props.generateScheduleErrors !== prevProps.generateScheduleErrors){
            this.props.getMatches(leagueId);
        }
    }

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
        const {addMatchResult, addMatchErrors, league, generateScheduleErrors, generateScheduleResult } = this.props;
        const {isMatchLoading, openModal, formItems} = this.state;
        const sortedMatches = this.renderMatchesRound();
        const id = this.props.match.params.id;
        let rounds = sortedMatches.length;
        return(
            <div>
                {isMatchLoading ? <Spinner /> :
                    <div style={{width:'100%', top:"140px", textAlign: 'center', margin: 0, position:"relative"}}>                    
                    <h2>{league && "Mecze ligii: " + league.name}</h2>
                {league  && league.teams && league.teams.length  ? <AddButton left tooltip="Dodaj mecz" action={this.onOpenModal}/> : '' }
                    <AddMatchModal
                        selectTeams={this.state.selectTeams}
                        currentHostError={this.state.currentHostError}
                        currentAwayError={this.state.currentAwayError}                        
                        setHostId={this.setHostId}
                        setAwayId={this.setAwayId}
                        currentHostId={this.state.currentHostId}
                        currentAwayId={this.state.currentAwayId}
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
                                 />) : 
                                 <div>
                                    <h3>Brak meczów w lidze.</h3>
                                    <Button onClick={() => this.generateSchedule()}
                                        variant="contained" color="primary">Wygeneruj mecze</Button>
                                    <ServerError 
                                        mainClass="server-error-container"
                                        show={(generateScheduleResult === false && generateScheduleResult !== undefined &&
                                            generateScheduleErrors.length > 0)}
                                        content={generateScheduleErrors} />
                                 </div> }

                    </div> 
                }
                    
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        generateScheduleResult: state.League.generateScheduleResult,
        generateScheduleErrors: state.League.generateScheduleErrors,

        addMatchResult: state.Match.addMatchResult,
        addMatchErrors: state.Match.addMatchErrors,
        matches: state.Match.matches,
        league: state.League.league    
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearGenerateSchedule: () => dispatch(generateSchedule(null,[])),
        generateSchedule: leagueId => dispatch(generateScheduleActionCreator(leagueId)),
        getLeague: leagueId => dispatch(getLeagueByIdActionCreator(leagueId)),
        getMatches: leagueId => dispatch(getMatchesActionCreator(leagueId)),
        addMatch: (formItems, leagueId, matchTeams) => dispatch(addMatchActionCreator(formItems, leagueId, matchTeams))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MatchContainer);