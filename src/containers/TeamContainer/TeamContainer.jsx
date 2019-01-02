import React from 'react';
import { connect } from 'react-redux';
import {addTeamActionCreator} from '../../store/actions/Team';
import {getLeagueByIdActionCreator} from '../../store/actions/League';
import Spinner from '../../components/UI/spinner/spinner';
import {Grid, Typography    } from '@material-ui/core/';
import CardButton from '../../components/UI/cardButton/CardButton';
import AddButton from '../../components/UI/addButton/AddButton';
import Modal from 'react-responsive-modal';
import Form from '../../components/UI/form/form';
import { formTitlesGenerator } from "../../constants/formTitles";
import { withCookies } from 'react-cookie';

class TeamContainer extends React.Component{
    state = {
        isTeamsLoading: true,
        openModal: false,
        formItems: [],        
        isLogged: !!this.props.cookies.get('FootballApp')
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
        this.props.getTeams(leagueId);            
        setTimeout( () => {
            this.setState({isTeamsLoading: false});
        }, 1500)        
    }

    render(){
        const {isTeamsLoading, openModal, formItems, isLogged} = this.state;
        const {league, addTeamResult, addTeamErrors, addTeam, match, history} = this.props;
        return (
            <Grid 
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
                {isTeamsLoading ? <Spinner /> : 
                <Grid style={{width:'100%', top:"80px", textAlign: 'center', margin: 0}}>
                {league.quantity > league.teams.length && isLogged && <AddButton tooltip="Dodaj drużynę" action={this.onOpenModal}/> }
                    <Typography align="center" style={{fontSize:33, color:'#fff', marginBottom:20, marginTop:20}}>{league.name}</Typography>
                    {league.teams ? league.teams.length > 0 ? 
                        league.teams.map((team,i) => <CardButton secondCard name={team.name} key={i} path={history.location.pathname+'/'+team.id} /> ) : "Brak drużyn w lidze."  : ''}
                </Grid>}
                <Modal
                    open={openModal}
                    onClose={() => this.onCloseModal()} >
                    <Form 
                        submitResult={addTeamResult}
                        submitErrors={addTeamErrors}
                        onSubmit={() => addTeam(formItems,match.params.id)}
                        additionalClasses="form-add-league-container"
                        setFields={this.setFields}
                        arrayName="formItems"
                        formItems={formItems}
                        {...formTitlesGenerator(
                        "addEditTeamTypes",
                        "addEditTeamRequirements",
                        "Dodawnie drużyny"
                        )}
                        btnTitle="Dodaj"
                        />
                 </Modal>
            </Grid>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        addTeamResult: state.Team.addTeamResult,
        addTeamErrors: state.Team.addTeamErrors,
        league: state.League.league,        
        cookies: ownProps.cookies
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getTeams: leagueId => dispatch(getLeagueByIdActionCreator(leagueId)),
        addTeam: (formItems,leagueId) => dispatch(addTeamActionCreator(formItems, leagueId))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withCookies(TeamContainer));