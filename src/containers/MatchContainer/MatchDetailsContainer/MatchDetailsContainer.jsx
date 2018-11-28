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
import {Button} from "@material-ui/core/"

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
                    <div style={{width:'100%', top:"100px", textAlign: 'center', margin: 0, position:"relative"}}>
                        <h2>{game && "Mecz: " + game.date}</h2>
                        <AddButton left tooltip="Dodaj mecz" action={this.onOpenEditModal}/>
                        <AddButton tooltip="Usuń mecz" action={this.onOpenDeleteModal}/>
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
                                 <Button color="secondary" onClick={() => deleteMatch(match.params.matchId, history, `/main/league/${match.params.id}/match`)} >Usuń</Button>                                 
                                 <Button onClick={() => this.onCloseDeleteModal()} >Anuluj</Button>
                             </div>
                         </Modal>
                        {Object.keys(game).length > 0 && <MatchDetailsTable game={game} />}
                    </div>
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