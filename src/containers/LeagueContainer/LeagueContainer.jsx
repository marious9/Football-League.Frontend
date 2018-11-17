import React from 'react';
import { connect } from 'react-redux';
import {getLeagueByIdActionCreator, getLeagueTableActionCreator} from '../../store/actions/League';
import Spinner from '../../components/UI/spinner/spinner';
import LeagueTable from '../../components/league/LeagueTable/LeagueTable';
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
        this.props.getLeagueTable(this.props.match.params.id)
        setTimeout( () => {
            this.props.getLeagueById(this.props.match.params.id);
            
            this.setState({isLeagueLoading: false});
        }, 2000)        
    }

    render(){
        const {league, leagueTable} = this.props;
        const {isLeagueLoading} = this.state;
        const table = <LeagueTable teams={leagueTable} />;
        
        return(
            <div>
                {isLeagueLoading ? <Spinner /> :
                    <div style={{width:'100%', top:"100px", textAlign: 'center', margin: 0}}>               
                        <h1>{league.name}</h1>   
                        <AddButton left tooltip="Dodaj mecz" action={this.onOpenModal}/>
                        <CardButton secondCard name="Mecze" path="/main" /> 
                        <CardButton name="Statystyki" path="/main" />                        
                        <CardButton name="Tabela" wide path="/main" />                                                                  
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