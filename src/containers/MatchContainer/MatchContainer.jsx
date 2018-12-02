import React from 'react';
import { connect } from 'react-redux';
import {getMatchesActionCreator, addMatchActionCreator} from '../../store/actions/Match';
import Spinner from '../../components/UI/spinner/spinner';
import AddButton from '../../components/UI/addButton/AddButton';
import AddMatchModal from '../../components/match/AddMatchModal/AddMatchModal';
import MatchesTable from '../../components/match/MatchesTable/MatchesTable';

class MatchContainer extends React.Component{
    state = {
        isMatchLoading: true,
        openModal: false,
        formItems: [],
        matches: []
    }

    setFields = (name, formItems) => { 
        this.setState({[name]: formItems});
      }

    onOpenModal = () => {
        this.setState({ openModal: true });
    };
     
    onCloseModal = () => {
        this.setState({ openModal: false });
    };


    componentDidMount(){
        const leagueId = this.props.match.params.id;
        setTimeout( () => {
            this.props.getMatches(leagueId);            
            this.setState({isMatchLoading: false, matches: this.props.matches});
        }, 2000)        
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

    render(){
        const {addMatchResult, addMatchErrors, addMatch } = this.props;
        const {isMatchLoading, openModal, formItems} = this.state;
        const sortedMatches = this.renderMatchesRound();
        const league = sortedMatches.length > 0 ? sortedMatches[0].league : null;
        const id = this.props.match.params.id;
        let rounds = sortedMatches.length;
        
        return(
            <div>
                {isMatchLoading ? <Spinner /> :
                    <div style={{width:'100%', top:"100px", textAlign: 'center', margin: 0, position:"relative"}}>                    
                    <h2>{league && "Mecze ligii: " + league.name}</h2>
                    <AddButton left tooltip="Dodaj mecz" action={this.onOpenModal}/>  
                    <AddMatchModal
                        leagueId={id}
                        addMatchResult={addMatchResult}
                        addMatchErrors={addMatchErrors} 
                        openModal={openModal} 
                        closeModal={this.onCloseModal} 
                        addMatch={addMatch} 
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
        getMatches: leagueId => dispatch(getMatchesActionCreator(leagueId)),
        addMatch: (formItems,matchId) => dispatch(addMatchActionCreator(formItems, matchId))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MatchContainer);