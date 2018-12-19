import React from 'react';
import { connect } from 'react-redux';
import { getTeamByIdActionCreator, editTeamActionCreator } from '../../../store/actions/Team';
import Spinner from '../../../components/UI/spinner/spinner';
import AddButton from '../../../components/UI/addButton/AddButton';
import MatchDetailsTable from '../../../components/match/MatchDetailsTable/MatchDetailsTable';
import Modal from 'react-responsive-modal';
import EditIcon from '@material-ui/icons/Edit';
import Form from '../../../components/UI/form/form';
import { formTitlesGenerator } from "../../../constants/formTitles";
import {Button, Tooltip} from "@material-ui/core/";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddCircle';
import Grid from '@material-ui/core/Grid';
import FormInput from '../../../components/UI/form/formInput/formInput'
import {Table, TableCell, TableRow, TableHead, TableBody  } from '@material-ui/core/';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    table: {
        minWidth: 700,
        backgroundColor: "#E3F2FD",
        color: '#fff'
      },
      tableCell: {
          color: '#fff',
          fontWeight: 700
      }
})

class TeamDetailsContainer extends React.Component{
    state = {
        isTeamLoading: true
    }
    componentDidMount(){
        const teamId = this.props.match.params.teamId;
        setTimeout( () => {
            this.props.getTeam(teamId);   
            this.setState({isTeamLoading: false});
        }, 1000)        
    }

    componentDidUpdate(prevProps){
        
    }    


    render(){
        const {team, classes} = this.props;
        const {isTeamLoading} = this.state;
        return(
            <div>
                {isTeamLoading ? <Spinner /> :                    
                    <div style={{width:'100%', top:"140px", textAlign: 'center', margin: 0, position:"relative"}}>
                    {team.name}
                    {team.players &&
                    <Table >
                        <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell}>Imię</TableCell>
                            <TableCell className={classes.tableCell}>Nazwisko</TableCell>
                            <TableCell className={classes.tableCell}>Data urodzenia</TableCell>
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
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>}
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        editTeamErrors: state.Team.editTeamErrors,
        editTeamResult: state.Team.editTeamResult,
        team: state.Team.team,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getTeam: teamId => dispatch(getTeamByIdActionCreator(teamId))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TeamDetailsContainer));