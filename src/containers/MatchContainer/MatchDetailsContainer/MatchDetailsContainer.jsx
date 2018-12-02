import React from 'react';
import { connect } from 'react-redux';
import {getMatchByIdActionCreator, editMatchActionCreator, deleteMatchActionCreator} from '../../../store/actions/Match';
import Spinner from '../../../components/UI/spinner/spinner';
import AddButton from '../../../components/UI/addButton/AddButton';
import MatchDetailsTable from '../../../components/match/MatchDetailsTable/MatchDetailsTable';
import Modal from 'react-responsive-modal';
import EditIcon from '@material-ui/icons/Edit';
import Form from '../../../components/UI/form/form';
import { formTitlesGenerator } from "../../../constants/formTitles";
import {Button, Tooltip} from "@material-ui/core/";
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';

class MatchContainerDetails extends React.Component{
    state = {
        isMatchLoading: true,
        openEditModal: false,
        openDeleteModal:false,
        formItems: []
    }

    setFields = (name, formItems) => { 
        this.setState({[name]: formItems});
      }

    onOpenEditModal = () => {
        this.setState({ openEditModal: true });
    };
     
    onCloseEditModal = () => {
        this.setState({ openEditModal: false });
    };

    onOpenDeleteModal = () => {
        this.setState({ openDeleteModal: true });
    };
     
    onCloseDeleteModal = () => {
        this.setState({ openDeleteModal: false });
    };

    componentDidMount(){
        const matchId = this.props.match.params.matchId;
        setTimeout( () => {
            this.props.getMatch(matchId);            
            this.setState({isMatchLoading: false});
        }, 2000)        
    }

    render(){
        const {game, editMatchResult, editMatchErrors, editMatch, match, deleteMatch, history } = this.props;
        const {isMatchLoading, openEditModal, formItems, openDeleteModal} = this.state;
        return(
            <div>
                {isMatchLoading ? <Spinner /> :                    
                    <Grid container alignItems="center">
                        <div style={{position:"absolute", top:'27%', left: '27%'}}>
                            <Tooltip title="Edytuj mecz">
                                <Button onClick={() => this.onOpenEditModal()}>                            
                                    <EditIcon />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Usuń mecz">
                                <Button onClick={() => this.onOpenDeleteModal()} variant="contained" color="secondary">
                                    <DeleteIcon />
                                </Button>
                            </Tooltip>
                        </div>
                        <Modal
                            open={openEditModal}
                            onClose={() => this.onCloseEditModal()} >
                            <Form 
                                submitResult={editMatchResult}
                                submitErrors={editMatchErrors}
                                onSubmit={() => editMatch(formItems,match.params.matchId)}
                                additionalClasses={"form-add-match-container"}
                                setFields={this.setFields}
                                arrayName="formItems"
                                formItems={formItems}
                                key={3}
                                {...formTitlesGenerator(
                                "editMatchTypes",
                                "editMatchRequirements",
                                "Edytowanie meczu"
                                )}
                                btnTitle="Edytuj"
                                />
                         </Modal>
                         <Modal
                            open={openDeleteModal}
                            onClose={() => this.onCloseDeleteModal()} >
                             <div style={{padding: 20}}>
                                <h3>Usuwanie meczu</h3>
                                <Button color="secondary" onClick={() => deleteMatch(match.params.matchId, history, `/main/league/${match.params.id}/match`)} >Usuń</Button>                                 
                                <Button onClick={() => this.onCloseDeleteModal()} >Anuluj</Button>
                             </div>
                         </Modal>
                        {Object.keys(game).length > 0 && <MatchDetailsTable game={game} />}
                    </Grid>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        editMatchResult: state.Match.editMatchResult,
        editMatchErrors: state.Match.editMatchErrors,
        deleteMatchResult: state.Match.deleteMatchResult,
        deleteMatchErrors: state.Match.deleteMatchErrors,
        game: state.Match.match,
        league: state.League.league    
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getMatch: matchId => dispatch(getMatchByIdActionCreator(matchId)),
        editMatch: (formItems,matchId) => dispatch(editMatchActionCreator(formItems, matchId)),
        deleteMatch: (matchId, history, path) => dispatch(deleteMatchActionCreator(matchId, history, path))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MatchContainerDetails);