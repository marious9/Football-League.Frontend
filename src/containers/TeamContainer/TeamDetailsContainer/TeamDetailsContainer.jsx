import React from 'react';
import { connect } from 'react-redux';
import { deletePlayerActionCreator, addPlayerActionCreator, editPlayerActionCreator } from '../../../store/actions/Player';
import { getTeamByIdActionCreator } from '../../../store/actions/Team';
import Spinner from '../../../components/UI/spinner/spinner';
import AddButton from '../../../components/UI/addButton/AddButton';
import MatchDetailsTable from '../../../components/match/MatchDetailsTable/MatchDetailsTable';
import Modal from 'react-responsive-modal';
import EditIcon from '@material-ui/icons/Edit';
import Form from '../../../components/UI/form/form';
import { formTitlesGenerator } from "../../../constants/formTitles";
import {Button} from "@material-ui/core/";
import Grid from '@material-ui/core/Grid';
import FormInput from '../../../components/UI/form/formInput/formInput'
import {Table, TableCell, TableRow, TableHead, TableBody, Typography  } from '@material-ui/core/';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    table: {
        minWidth: 700,
        marginBottom: 100
      },
      tableCell: {
          color: '#fff',
          fontWeight: 700
      },
      title: {
        fontSize: 40,
        color: '#fff'  
      },
      deletePlayerIcon: {
          cursor: 'pointer',
          '&:hover': {
              color: "red"
          }
      },
      editPlayerIcon: {
        cursor: 'pointer',
        '&:hover': {
            color: "#63a4ff"
        }
    }
})

class TeamDetailsContainer extends React.Component{
    state = {
        isTeamLoading: true,
        openDeletePlayerModal: false,
        currentDeletePlayerId: null,        
        openAddPlayerModal: false,
        addPlayerFormItems: [],
        editPlayerFormItems: [],
        currentEditPlayerId: null,
        openEditPlayerModal: false

    }
    componentDidMount(){
        const teamId = this.props.match.params.teamId;
        setTimeout( () => {
            this.props.getTeam(teamId);   
            this.setState({isTeamLoading: false});
        }, 1000)        
    }

    componentDidUpdate(prevProps){        
        const teamId = this.props.match.params.teamId;
        if(this.props.deletePlayerResult && this.props.deletePlayerErrors !== prevProps.deletePlayerErrors) {            
            this.props.getTeam(teamId);
            this.setState({openDeletePlayerModal: false})
        }
        if(this.props.addPlayerResult && this.props.addPlayerErrors !== prevProps.addPlayerErrors) {            
            this.props.getTeam(teamId);
            this.setState({openAddPlayerModal: false});            
        }
        if(this.props.editPlayerResult && this.props.editPlayerErrors !== prevProps.editPlayerErrors) {            
            this.props.getTeam(teamId);
            this.setState({openEditPlayerModal: false});            
        }
    }

    deletePlayer = () => {
        this.props.deletePlayer(this.state.currentDeletePlayerId)
    }

    addPlayer = () => {        
        const teamId = this.props.match.params.teamId;
        this.props.addPlayer(teamId, this.state.addPlayerFormItems);
    }

    editPlayer = () => {
        this.props.editPlayer(this.state.currentEditPlayerId, this.state.editPlayerFormItems);
    }
    
    setFields = (name, formItems) => { 
        this.setState({[name]: formItems});
      }

    onCloseDeletePlayerModal = () => {
        this.setState({openDeletePlayerModal: false})
    }

    onOpenDeletePlayerModal = playerId => {
        this.setState({openDeletePlayerModal: true, currentDeletePlayerId: playerId})
    }

    onOpenAddPlayerModal = () => {
        this.setState({openAddPlayerModal: true});
    }

    onCloseAddPlayerModal= () => {
        this.setState({openAddPlayerModal: false});
    }

    onOpenEditPlayerModal = playerId => {
        this.setState({openEditPlayerModal: true, currentEditPlayerId: playerId});
    }

    onCloseEditPlayerModal= () => {
        this.setState({openEditPlayerModal: false});
    }


    render(){
        const {team, classes, addPlayerErrors, addPlayerResult, editPlayerResult, editPlayerErrors} = this.props;
        const {isTeamLoading, openDeletePlayerModal, addPlayerFormItems, openAddPlayerModal, editPlayerFormItems, openEditPlayerModal} = this.state;
        return(
            <div>
                {isTeamLoading ? <Spinner /> :                    
                    <div style={{width:'100%', top:"100px", textAlign: 'center', margin: 0, position:"relative"}}>
                    <Typography align="center" className={classes.title}> {team.name}</Typography>                     
                    <AddButton tooltip="Dodaj zawodnika" action={this.onOpenAddPlayerModal}/>
                    {team.players &&
                    <Table className={classes.table} >
                        <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell}>Imię</TableCell>
                            <TableCell className={classes.tableCell}>Nazwisko</TableCell>
                            <TableCell className={classes.tableCell}>Data urodzenia</TableCell>
                            <TableCell className={classes.tableCell}>Akcje</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {team.players.length && team.players.map(player => {
                            return (
                            <TableRow key={player.id}>
                                <TableCell className={classes.tableCell} component="th" scope="row">
                                {player.firstname}
                                </TableCell>
                                <TableCell className={classes.tableCell} numeric>{player.lastname}</TableCell>
                                <TableCell className={classes.tableCell} numeric>{moment(player.birthDate).format('DD-MM-YYYY')}</TableCell>
                                <TableCell className={classes.tableCell} >
                                    <i onClick={() => this.onOpenEditPlayerModal(player.id)} className={"far fa-edit " + classes.editPlayerIcon}></i> {'   '}
                                    <i onClick={() => this.onOpenDeletePlayerModal(player.id)} className={"fas fa-user-times " + classes.deletePlayerIcon}></i>
                                    </TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>}
                    <Modal
                        open={openDeletePlayerModal}
                        onClose={() => this.onCloseDeletePlayerModal()} >
                            <div style={{padding: 20}}>
                            <h3>Usuwanie zawodnika</h3>
                            <Button color="secondary" onClick={() => this.deletePlayer()} >Usuń</Button>                                 
                            <Button onClick={() => this.onCloseDeletePlayerModal()}>Anuluj</Button>
                            </div>
                    </Modal>
                    <Modal
                        open={openAddPlayerModal}
                        onClose={() => this.onCloseAddPlayerModal()} >
                        <Form 
                            submitResult={addPlayerResult}
                            submitErrors={addPlayerErrors}
                            onSubmit={() => this.addPlayer()}
                            additionalClasses={"form-add-edit-player-container"}
                            setFields={this.setFields}
                            arrayName="addPlayerFormItems"
                            formItems={addPlayerFormItems}
                            key={1}
                            {...formTitlesGenerator(
                            "addEditPlayerTypes",
                            "addEditPlayerRequirements",
                            "Dodawanie zawodnika"
                            )}
                            btnTitle="Dodaj"
                        />
                    </Modal>
                    <Modal
                        open={openEditPlayerModal}
                        onClose={() => this.onCloseEditPlayerModal()} >
                        <Form 
                            submitResult={editPlayerResult}
                            submitErrors={editPlayerErrors}
                            onSubmit={() => this.editPlayer()}
                            additionalClasses={"form-add-edit-player-container"}
                            setFields={this.setFields}
                            arrayName="editPlayerFormItems"
                            formItems={editPlayerFormItems}
                            key={1}
                            {...formTitlesGenerator(
                            "addEditPlayerTypes",
                            "addEditPlayerRequirements",
                            "Edytowanie zawodnika"
                            )}
                            btnTitle="Edytuj"
                        />
                    </Modal>

                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        addPlayerErrors: state.Player.addPlayerErrors,
        addPlayerResult: state.Player.addPlayerResult,

        editPlayerErrors: state.Player.editPlayerErrors,
        editPlayerResult: state.Player.editPlayerResult,

        deletePlayerErrors: state.Player.deletePlayerErrors,
        deletePlayerResult: state.Player.deletePlayerResult,

        editTeamErrors: state.Team.editTeamErrors,
        editTeamResult: state.Team.editTeamResult,
        team: state.Team.team,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addPlayer: (teamId, formItems) => dispatch(addPlayerActionCreator(formItems, teamId)),
        deletePlayer: playerId => dispatch(deletePlayerActionCreator(playerId)),
        editPlayer: (playerId, formItems) => dispatch(editPlayerActionCreator(formItems, playerId)),        
        getTeam: teamId => dispatch(getTeamByIdActionCreator(teamId))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TeamDetailsContainer));