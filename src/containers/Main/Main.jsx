import React from 'react';
import { connect } from 'react-redux';
import LeagueCard from '../../components/league/LeagueCard';
import {getLeaguesActionCreator, addLeagueActionCreator} from '../../store/actions/League';
import './Main.css';import Spinner from '../../components/UI/spinner/spinner';
import AddButton from '../../components/UI/addButton/AddButton';
import AddLeagueModal from '../../components/league/AddLeagueModal/AddLeagueModal'
import CardButton from '../../components/UI/cardButton/CardButton';

class Main extends React.Component{
    state = {
        isLeaguesLoading: true,
        openModal: false,
        formItems: []
    }

    componentDidMount(){
        setTimeout( () => {
            this.props.getLeagues();
            this.setState({isLeaguesLoading: false});
        }, 2000)    
    };
    
    componentDidUpdate(prevProps) {
        if(this.props.addLeagueResult && this.props.addLeagueErrors !== prevProps.addLeagueErrors){
            this.props.getLeagueById(this.props.match.params.id);
        }
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

    render(){
        const {leagues, history, addLeague, addLeagueResult, addLeagueErrors} = this.props;
        const {isLeaguesLoading, openModal, formItems} = this.state;
        return(
            <div>
            {isLeaguesLoading ? <Spinner /> :
                <div className="main-container">
                    <AddButton tooltip="Dodaj ligę" action={this.onOpenModal}/>
                    <AddLeagueModal
                        addLeagueResult={addLeagueResult}
                        addLeagueErrors={addLeagueErrors} 
                        openModal={openModal} 
                        closeModal={this.onCloseModal} 
                        addLeague={addLeague} 
                        setFields={this.setFields} 
                        formItems={formItems} />
                    {leagues.map(league => {
                        return (                            
                            <CardButton key={league.id} path={`${history.location.pathname}/league/${league.id}`} name={league.name} />

                        )})
                    } 
                </div>
            }     
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        addLeagueResult: state.League.addLeagueResult,
        addLeagueErrors: state.League.addLeagueErrors,
        leagues: state.League.leagues
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addLeague: formItems => dispatch(addLeagueActionCreator(formItems)),
        getLeagues: () => dispatch(getLeaguesActionCreator())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);