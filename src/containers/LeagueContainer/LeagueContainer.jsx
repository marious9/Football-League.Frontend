import React from 'react';
import { connect } from 'react-redux';
import {getLeagueByIdActionCreator} from '../../store/actions/League';
import Spinner from '../../components/UI/spinner/spinner';
import CardButton from '../../components/UI/cardButton/CardButton';
import AddButton from '../../components/UI/addButton/AddButton';

class LeagueContainer extends React.Component{
    state = {
        isLeagueLoading: true,
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
            this.props.getLeagueById(this.props.match.params.id);
            
            this.setState({isLeagueLoading: false});
        }, 2000)        
    }

    render(){
        const {league} = this.props;
        const {isLeagueLoading} = this.state;
        
        return(
            <div>
                {isLeagueLoading ? <Spinner /> :
                    <div style={{width:'100%', top:"100px", textAlign: 'center', margin: 0}}>               
                        <h1>{league.name}</h1>
                        <CardButton secondCard name="Mecze" path={`${this.props.history.location.pathname}/match`} /> 
                        <CardButton name="Statystyki" path="/main" />                        
                        <CardButton name="Tabela" wide path={`${this.props.history.location.pathname}/table`} />                                                                  
                    </div> 

                }
                    
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {    
        league: state.League.league
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getLeagueById: leagueId => dispatch(getLeagueByIdActionCreator(leagueId))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(LeagueContainer);