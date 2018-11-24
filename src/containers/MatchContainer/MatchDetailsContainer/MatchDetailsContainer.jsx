import React from 'react';
import { connect } from 'react-redux';
import {getMatchByIdActionCreator, addMatchActionCreator} from '../../../store/actions/Match';
import Spinner from '../../../components/UI/spinner/spinner';
import AddButton from '../../../components/UI/addButton/AddButton';
import MatchDetailsTable from '../../../components/match/MatchDetailsTable/MatchDetailsTable';

class MatchContainerDetails extends React.Component{
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
        const matchId = this.props.match.params.matchId;
        setTimeout( () => {
            this.props.getMatch(matchId);            
            this.setState({isMatchLoading: false});
        }, 2000)        
    }

    render(){
        const {game, addMatchResult, addMatchErrors, addMatch, history } = this.props;
        const {isMatchLoading, openModal, formItems} = this.state;
        console.log(game)
        return(
            <div>
                {isMatchLoading ? <Spinner /> :
                    <div style={{width:'100%', top:"100px", textAlign: 'center', margin: 0, position:"relative"}}>
                        <h2>{game && "Mecz: " + game.date}</h2>
                        <AddButton left tooltip="Dodaj mecz" action={this.onOpenModal}/>
                        {Object.keys(game).length > 0 && <MatchDetailsTable game={game} />}
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
        game: state.Match.match,
        league: state.League.league    
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getMatch: matchId => dispatch(getMatchByIdActionCreator(matchId)),
        addMatch: (formItems,matchId) => dispatch(addMatchActionCreator(formItems, matchId))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MatchContainerDetails);