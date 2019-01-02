import React from 'react';
import { connect } from 'react-redux';
import {getLeaguesActionCreator, addLeagueActionCreator} from '../../store/actions/League';
import './Main.css';import Spinner from '../../components/UI/spinner/spinner';
import AddButton from '../../components/UI/addButton/AddButton';
import AddLeagueModal from '../../components/league/AddLeagueModal/AddLeagueModal'
import CardButton from '../../components/UI/cardButton/CardButton';
import { withCookies } from 'react-cookie';

class Main extends React.Component{
    state = {
        isLeaguesLoading: true,
        openModal: false,
        formItems: [],
        isLogged: !!this.props.cookies.get('FootballApp')
    }

    componentDidMount(){
        setTimeout( () => {
            this.props.getLeagues();
            this.setState({isLeaguesLoading: false});
        }, 1500)    
    };
    
    componentDidUpdate(prevProps) {
        if(this.props.addLeagueResult && this.props.addLeagueErrors !== prevProps.addLeagueErrors){
            this.props.getLeagues();
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
        const {leagues, history, addLeague, addLeagueResult, addLeagueErrors, cookies} = this.props;
        const {isLeaguesLoading, openModal, formItems, isLogged} = this.state;
        return(
            <div>
            {isLeaguesLoading ? <Spinner /> :
            <div style={{width:'100%', top:"140px", textAlign: 'center', margin: 0, position:"relative"}}>
                    {isLogged &&<AddButton tooltip="Dodaj ligę" action={this.onOpenModal}/>}
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

const mapStateToProps = (state, ownProps) => {
    return {
        addLeagueResult: state.League.addLeagueResult,
        addLeagueErrors: state.League.addLeagueErrors,
        leagues: state.League.leagues,
        cookies: ownProps.cookies
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addLeague: formItems => dispatch(addLeagueActionCreator(formItems)),
        getLeagues: () => dispatch(getLeaguesActionCreator())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withCookies(Main));