import React from 'react';
import { connect } from 'react-redux';
import { getMatchByIdActionCreator, editMatchActionCreator, deleteMatchActionCreator, editMatch } from '../../../store/actions/Match';
import { addStatisticActionCreator, addStatistic } from '../../../store/actions/Statistic';
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

class MatchContainerDetails extends React.Component{
    state = {
        isMatchLoading: true,
        openEditModal: false,
        openDeleteModal: false,
        openAddStatisticModal: false,
        addStatisticFormItems: [],
        editMatchFormItems: [],
        players:[],
        currentPlayerId: 0
    }

    setFields = (name, formItems) => { 
        this.setState({[name]: formItems});
    }

    setPlayerId = (name) => {
        this.setState({currentPlayerId: name});
    }

    onOpenAddStatisticModal = () => {
        this.setState({players: this.getMatchPlayers(), openAddStatisticModal: true });
    };

    onCloseAddStatisticModal = () => {
        this.setState({ openAddStatisticModal: false });
    };

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

    addStatistic = (formItems) => {
        const addStatisticIds = {
            playerId: this.state.currentPlayerId,
            matchId: this.props.match.params.matchId
        }
        
        this.props.addStatistic(formItems, addStatisticIds);
    }

    getMatchPlayers() {
        const {game} = this.props;
        if(Object.keys(game).length === 0 ) return [];
        let players = [];
        game.host && game.host.players.map(p => players.push({label: p.firstname + " " + p.lastname, value: p.id})) 
        game.away && game.away.players.map(p => players.push({label: p.firstname + " " + p.lastname, value: p.id}))
        this.setState({currentPlayerId: players[0].value})

        return players;
    }

    componentDidMount(){
        const matchId = this.props.match.params.matchId;
        setTimeout( () => {
            this.props.getMatch(matchId);            
            this.setState({isMatchLoading: false});
        }, 2000)        
    }

    componentDidUpdate(prevProps){
        const matchId = this.props.match.params.matchId;
        // if(Object.keys(prevProps.game) && Object.keys(this.props.game) && prevProps.game !== this.props.game){
        //     console.log("this.props", this.props.game)
        //     console.log("prevprops", prevProps.game)
        //     this.props.getMatch(matchId);
        // }
        if(!prevProps.editMatchResult && this.props.editMatchResult) {
            this.props.clearEditMatch();
            this.setState({openEditModal: false})
        }

        if(!prevProps.addStatisticResult && this.props.addStatisticResult) {
            this.props.clearAddStatistic();
            this.setState({openAddStatisticModal: false})
        }
    }

    render(){
        const {game, editMatchResult, editMatchErrors, editMatch, match, deleteMatch, history, addStatisticResult, addStatisticErrors } = this.props;
        const {isMatchLoading, openEditModal, formItems, openDeleteModal, openAddStatisticModal, addStatisticFormItems, editMatchFormItems} = this.state;        
        return(
            <div>
                {isMatchLoading ? <Spinner /> :                    
                    <Grid container alignItems="center">
                        <div style={{position:"absolute", top:'27%', left: '27%'}}>
                            <Tooltip title="Edytuj mecz" color="primary" variant="contained">
                                <Button onClick={() => this.onOpenEditModal()}>                            
                                    <EditIcon />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Usuń mecz">
                                <Button onClick={() => this.onOpenDeleteModal()} color="secondary" variant="contained">
                                    <DeleteIcon />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Dodaj statystykę">
                                <Button onClick={() => this.onOpenAddStatisticModal()} variant="contained" style={{backgroundColor: '#388e3c'}} >
                                    <AddIcon />
                                </Button>
                            </Tooltip>
                        </div>
                        <Modal
                            open={openAddStatisticModal}
                            onClose={() => this.onCloseAddStatisticModal()} >
                            <Form 
                                marginTop
                                submitResult={addStatisticResult}
                                submitErrors={addStatisticErrors}
                                onSubmit={() => this.addStatistic(addStatisticFormItems)}
                                additionalClasses={"form-add-statistic-container"}
                                setFields={this.setFields}
                                arrayName="addStatisticFormItems"
                                formItems={addStatisticFormItems}
                                key={2}
                                {...formTitlesGenerator(
                                "addStatisticTypes",
                                "addStatisticRequirements",
                                "Dodawanie statystyki"
                                )}
                                btnTitle="Dodaj"
                                />
                                <FormInput
                                    irregularClass
                                    nullable 
                                    selectItems={this.state.players}
                                    onChange={e => this.setPlayerId(e.target.value)}
                                    value={this.state.players.value}
                                    error={this.state.players.error}
                                    key={10} 
                                    type={"select"}
                                    placeholder={"Wybierz zawodnika"}
                                    title={"Zawodnik"} />
                         </Modal>


                        <Modal
                            open={openEditModal}
                            onClose={() => this.onCloseEditModal()} >
                            <Form 
                                submitResult={editMatchResult}
                                submitErrors={editMatchErrors}
                                onSubmit={() => editMatch(editMatchFormItems,match.params.matchId)}
                                additionalClasses={"form-edit-match-container"}
                                setFields={this.setFields}
                                arrayName="editMatchFormItems"
                                formItems={editMatchFormItems}
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
        addStatisticErrors: state.Statistic.addStatisticErrors,
        addStatisticResult: state.Statistic.addStatisticResult,

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
        clearAddStatistic: () => dispatch(addStatistic([], null)),
        clearEditMatch: () => dispatch(editMatch([], null)),
        editMatch: (formItems,matchId) => dispatch(editMatchActionCreator(formItems, matchId)),
        deleteMatch: (matchId, history, path) => dispatch(deleteMatchActionCreator(matchId, history, path)),
        addStatistic: (formItems, statIds) => dispatch(addStatisticActionCreator(formItems, statIds))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MatchContainerDetails);