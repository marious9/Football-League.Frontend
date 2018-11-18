import React from 'react';
import { connect } from 'react-redux';
import {getMatchesActionCreator} from '../../store/actions/Match';
import Spinner from '../../components/UI/spinner/spinner';
import CardButton from '../../components/UI/cardButton/CardButton';
import AddButton from '../../components/UI/addButton/AddButton';
import { Typography } from '@material-ui/core';

class LeagueContainer extends React.Component{
    state = {
        isMatchLoading: true,
        openModal: false,
        formItems: []
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
        setTimeout( () => {
            this.props.getMatches();            
            this.setState({isMatchLoading: false});
        }, 2000)        
    }

    renderMatchesRound() {
        const {matches} = this.props;
        const sortedMatches = matches.sort((match1, match2) => match2.hostScore - match1.hostScore);    
        const minRound =sortedMatches[sortedMatches.length-1].round;
        const maxRound = sortedMatches[0].round;
        let events = [];
        let jsx;
        for(let i=maxRound ; i<=minRound;i--){
            const roundMatches = sortedMatches.filter(match => match.round === i);            
            console.log(`Runda ${i}`)
            jsx =  (
                <div>
                <h1>Runda {i}</h1>
                {roundMatches.map(match => (
                    <CardButton
                    matchText
                    secondCard
                    key={match.id} 
                    name={`${match.host.name} ${match.hostScore} : ${match.awayScore} ${match.away.name}`}
                    path={`${this.props.history.location.pathname}/${match.id}`} />
                    
                ))}
                </div>
            );
            // for(let match of roundMatches){
            //     events.push(`${match.host.name} ${match.hostScore} vs ${match.awayScore} ${match.away.name}`)
            // }
        }
        return jsx;
    }

    render(){
        const {matches} = this.props;
        const {isMatchLoading} = this.state;
        const id = this.props.match.params.id;
        const games = matches.filter(match => match.league.id == id); 
        const league = games.length > 0 ? games[0].league : null;
       //const jsx =  matches.length > 0 && this.renderMatchesRound();
       //console.log(jsx)
        const matchesCards = games.map(match => {
            if (games.indexOf(match) !== 0)
                return (
                    <CardButton 
                        matchText
                        key={match.id}
                        name={`${match.host.name} ${match.hostScore} : ${match.awayScore} ${match.away.name}`}
                        path={`${this.props.history.location.pathname}/${match.id}`} />
                );
            return (
                <CardButton
                    matchText
                    secondCard
                    key={match.id} 
                    name={`${match.host.name} ${match.hostScore} : ${match.awayScore} ${match.away.name}`}
                    path={`${this.props.history.location.pathname}/${match.id}`} />
            ) 
        })
        
        return(
            <div>
                {isMatchLoading ? <Spinner /> :
                    <div style={{width:'100%', top:"100px", textAlign: 'center', margin: 0, position:"relative"}}>
                    <h2>{league && "Mecze ligii: " + league.name}</h2>
                    <AddButton left tooltip="Dodaj mecz" action={this.onOpenModal}/>      
                      {matchesCards}  
                    </div> 
                }
                    
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {    
        matches: state.Match.matches,
        league: state.League.league    
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getMatches: () => dispatch(getMatchesActionCreator())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(LeagueContainer);