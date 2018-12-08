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

class TeamContainer extends React.Component{
    state = {
        isTeamsLoading: true,
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
        const leagueId = this.props.match.params.id;
        setTimeout( () => {
            this.props.getTeams(leagueId);            
            this.setState({isTeamsLoading: false, teams: this.props.league ?  this.props.league.teams : []});
        }, 2000)        
    }

    render(){
        const {isTeamsLoading, openModal, formItems} = this.state;
        const {league, addTeamResult, addTeamErrors, addTeam, match} = this.props;
        return (
            <Grid 
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
                {isTeamsLoading ? <Spinner /> : 
                <Grid style={{width:'100%', top:"80px", textAlign: 'center', margin: 0}}>
                <AddButton tooltip="Dodaj drużynę" action={this.onOpenModal}/> 
                    <Typography align="center" style={{fontSize:33, color:'#fff', marginBottom:20}}>{league.name}</Typography>
                    {league.teams ? league.teams.length > 0 ? 
                        league.teams.map((team,i) => <CardButton secondCard name={team.name} key={i} path="" /> ) : "Brak drużyn w lidze."  : ''}
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

const mapStateToProps = state => {
    return {
        addTeamResult: state.Team.addTeamResult,
        addTeamErrors: state.Team.addTeamErrors,
        league: state.League.league    
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getTeams: leagueId => dispatch(getLeagueByIdActionCreator(leagueId)),
        addTeam: (formItems,leagueId) => dispatch(addTeamActionCreator(formItems, leagueId))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(TeamContainer);