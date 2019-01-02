import React from 'react';
import { connect } from 'react-redux';
import { getMatchByIdActionCreator, editMatchActionCreator, deleteMatchActionCreator, editMatch } from '../../../store/actions/Match';
import { addStatisticActionCreator, addStatistic, getMatchStatisticsActionCreator, deleteStatisticActionCreator, deleteStatistic } from '../../../store/actions/Statistic';
import Spinner from '../../../components/UI/spinner/spinner';
import MatchDetailsTable from '../../../components/match/MatchDetailsTable/MatchDetailsTable';
import Modal from 'react-responsive-modal';
import EditIcon from '@material-ui/icons/Edit';
import Form from '../../../components/UI/form/form';
import { formTitlesGenerator } from "../../../constants/formTitles";
import {Button, Tooltip} from "@material-ui/core/";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddCircle';
import Grid from '@material-ui/core/Grid';
import FormInput from '../../../components/UI/form/formInput/formInput';
import { withCookies } from 'react-cookie';

class MatchContainerDetails extends React.Component{
    state = {
        idOfStatisticToDelete: null,
        openDeleteStatisticModal: false,
        isMatchLoading: true,
        openEditModal: false,
        openDeleteModal: false,
        openAddStatisticModal: false,
        addStatisticFormItems: [],
        editMatchFormItems: [],
        players:[],
        currentPlayerId: 0,
        isLogged: !!this.props.cookies.get('FootballApp')
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

    onOpenDeleteStatisticModal = e => {
        this.setState({ openDeleteStatisticModal: true, idOfStatisticToDelete: e });
    };

    onCloseDeleteStatisticModal = () => {
        this.setState({ openDeleteStatisticModal: false});
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
            this.props.getMatchStatistic(matchId);
            this.setState({isMatchLoading: false});
        }, 1500)        
    }

    componentDidUpdate(prevProps){
        const matchId = this.props.match.params.matchId;
        if(this.props.editMatchResult && prevProps.editMatchErrors !== this.props.editMatchErrors) {
            this.props.clearEditMatch();            
            this.props.getMatch(matchId);
            this.setState({openEditModal: false})
        }

        if(this.props.addStatisticResult && this.props.addStatisticErrors !== prevProps.addStatisticErrors) {
            this.props.clearAddStatistic();               
            this.props.getMatchStatistic(matchId);
            this.setState({openAddStatisticModal: false})
        }

        if(this.props.deleteStatisticResult && this.props.deleteStatisticErrors !== prevProps.deleteStatisticErrors) {
            this.props.clearDeleteStatistic();               
            this.props.getMatchStatistic(matchId);
            this.setState({openDeleteStatisticModal: false})
        }
    }

    render(){
        const {game, editMatchResult, editMatchErrors, editMatch, match, deleteMatch, history, addStatisticResult,
            addStatisticErrors, matchStatistics } = this.props;
        const {isMatchLoading, openEditModal, openDeleteModal, openAddStatisticModal, addStatisticFormItems,
            editMatchFormItems, openDeleteStatisticModal, idOfStatisticToDelete, isLogged} = this.state;
        return(
            <div>
                {isMatchLoading ? <Spinner /> :                    
                    <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center">
                        {isLogged && <div style={{position:"absolute", top:'275px'}}>
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
                                <Button onClick={() => this.onOpenAddStatisticModal()} variant="contained" style={{backgroundColor: '#388e3c', color: '#fff'}} >
                                    <AddIcon />
                                </Button>
                            </Tooltip>
                        </div>}
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
                            open={openDeleteStatisticModal}
                            onClose={() => this.onCloseDeleteStatisticModal()} >
                             <div style={{padding: 20}}>
                                <h3>Usuwanie statystyki</h3>
                                <Button color="secondary" onClick={() => this.props.deleteStatistic(idOfStatisticToDelete)} >Usuń</Button>                                 
                                <Button onClick={() => this.onCloseDeleteStatisticModal()} >Anuluj</Button>
                             </div>
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
                        {Object.keys(game).length > 0 && <MatchDetailsTable isLogged={isLogged} onOpenDeleteStatisticModal={this.onOpenDeleteStatisticModal} matchStatistics={matchStatistics} game={game} />}
                    </Grid>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        deleteStatisticErrors: state.Statistic.deleteStatisticErrors,
        deleteStatisticResult: state.Statistic.deleteStatisticResult,

        addStatisticErrors: state.Statistic.addStatisticErrors,
        addStatisticResult: state.Statistic.addStatisticResult,

        editMatchResult: state.Match.editMatchResult,
        editMatchErrors: state.Match.editMatchErrors,

        deleteMatchResult: state.Match.deleteMatchResult,
        deleteMatchErrors: state.Match.deleteMatchErrors,

        matchStatistics: state.Statistic.matchStatistics,
        game: state.Match.match,
        league: state.League.league,       
        cookies: ownProps.cookies
    };
}

const mapDispatchToProps = dispatch => {
    return {
        deleteStatistic: statisticId => dispatch(deleteStatisticActionCreator(statisticId)),
        getMatchStatistic: matchId => dispatch(getMatchStatisticsActionCreator(matchId)),
        getMatch: matchId => dispatch(getMatchByIdActionCreator(matchId)),
        clearAddStatistic: () => dispatch(addStatistic([], null)),        
        clearDeleteStatistic: () => dispatch(deleteStatistic([], null)),
        clearEditMatch: () => dispatch(editMatch([], null)),
        editMatch: (formItems,matchId) => dispatch(editMatchActionCreator(formItems, matchId)),
        deleteMatch: (matchId, history, path) => dispatch(deleteMatchActionCreator(matchId, history, path)),
        addStatistic: (formItems, statIds) => dispatch(addStatisticActionCreator(formItems, statIds))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withCookies(MatchContainerDetails));