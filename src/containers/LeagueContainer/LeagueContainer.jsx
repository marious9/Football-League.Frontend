import React from 'react';
import { connect } from 'react-redux';
import {getLeagueByIdActionCreator, editLeagueActionCreator, deleteLeagueActionCreator} from '../../store/actions/League';
import Spinner from '../../components/UI/spinner/spinner';
import CardButton from '../../components/UI/cardButton/CardButton';
import {Grid, Typography, Tooltip, Button} from '@material-ui/core/';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from 'react-responsive-modal';
import Form from '../../components/UI/form/form';
import {formTitlesGenerator} from '../../constants/formTitles';
import { withCookies } from 'react-cookie';

class LeagueContainer extends React.Component{
    state = {
        isLeagueLoading: true,
        openModal: false,
        formItems: [],
        openEditLeagueModal: false,
        openDeleteLeagueModal: false,        
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
        setTimeout( () => {
            this.props.getLeagueById(this.props.match.params.id);
            
            this.setState({isLeagueLoading: false});
        }, 1500)        
    }

    componentDidUpdate(prevProps) {
        const leagueId = this.props.match.params.id;                
        if(this.props.editLeagueResult && this.props.editLeagueErrors !== prevProps.editLeagueErrors) {
            this.props.getLeagueById(leagueId);
            this.onCloseEditLeagueModal();
        }
        if(this.props.deleteLeagueResult && this.props.deleteLeagueErrors !== prevProps.deleteLeagueErrors) {
            this.props.getLeagueById(leagueId);
            this.props.history.push("/main");        }
    }

    onOpenEditLeagueModal = () => 
        this.setState({openEditLeagueModal: true})

    onCloseEditLeagueModal = () => 
        this.setState({openEditLeagueModal: false})

    onOpenDeleteLeagueModal = () => 
        this.setState({openDeleteLeagueModal: true})

    onCloseDeleteLeagueModal = () => 
        this.setState({openDeleteLeagueModal: false})

    render(){
        const {league, deleteLeague, editLeague, editLeagueResult, editLeagueErrors} = this.props;
        const {isLeagueLoading, openEditLeagueModal, formItems, openDeleteLeagueModal, isLogged} = this.state;
        return(
            <Grid 
            container
            direction="row"
            justify="center"
            alignItems="center"
          >                    
                {isLeagueLoading ? <Spinner /> :
                    <Grid style={{width:'100%', top:"100px", textAlign: 'center', margin: 0}}>                                   
                        <Typography align="center" style={{fontSize:33, color:"#fff"}}>{league.name}</Typography>
                        {isLogged &&
                        <Grid style={{marginBottom: 10}}>
                            <Tooltip title="Edytuj ligę" color="primary" variant="contained">
                                <Button onClick={() => this.onOpenEditLeagueModal()}>                            
                                    <EditIcon />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Usuń ligę" color="secondary" variant="contained">
                                <Button onClick={() => this.onOpenDeleteLeagueModal()}>                            
                                    <DeleteIcon />
                                </Button>
                            </Tooltip>
                        </Grid>}
                        <CardButton name="Mecze" path={`${this.props.history.location.pathname}/match`} /> 
                        <CardButton name="Statystyki" path={`${this.props.history.location.pathname}/statistics`} />                        
                        <CardButton name="Tabela" path={`${this.props.history.location.pathname}/table`} /> 
                        <CardButton name="Drużyny" path={`${this.props.history.location.pathname}/teams`} />                                                             
                    </Grid>
                }
                <Modal
                    open={openEditLeagueModal}
                    onClose={this.onCloseEditLeagueModal} >
                    <Form
                        submitResult={editLeagueResult}
                        submitErrors={editLeagueErrors}
                        onSubmit={() => editLeague(this.props.match.params.id, formItems)}
                        additionalClasses={"form-edit-league-container"}
                        setFields={this.setFields}
                        arrayName="formItems"
                        formItems={formItems}
                        key={1}
                        {...formTitlesGenerator(
                          "editLeagueTypes",
                          "editLeagueRequirements",
                          "Edytowanie ligi"
                        )}
                        btnTitle="Edytuj"
                        />
                 </Modal>
                 
                <Modal
                    open={openDeleteLeagueModal}
                    onClose={this.onCloseDeleteLeagueModal} >
                        <div style={{padding: 20}}>
                            <h3 style={{textAlign:'center'}}>Usuwanie ligi</h3>
                            <div>Czy na pewno chcesz usunąć ligę?</div>
                            <div style={{textAlign:'center'}}>
                            <Button color="secondary" onClick={() => deleteLeague(this.props.match.params.id)} >Usuń</Button>                                 
                            <Button onClick={() => this.onCloseDeleteLeagueModal()} >Anuluj</Button>
                            </div>
                        </div>
                 </Modal>
                    
            </Grid>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        editLeagueResult: state.League.editLeagueResult,
        editLeagueErrors: state.League.editLeagueErrors,
        
        deleteLeagueResult: state.League.deleteLeagueResult,
        deleteLeagueErrors: state.League.deleteLeagueErrors,

        league: state.League.league,
        cookies: ownProps.cookies
    };
}

const mapDispatchToProps = dispatch => {
    return {
        deleteLeague: leagueId => dispatch(deleteLeagueActionCreator(leagueId)),
        editLeague: (leagueId, formItems) => dispatch(editLeagueActionCreator(formItems, leagueId)),
        getLeagueById: leagueId => dispatch(getLeagueByIdActionCreator(leagueId))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withCookies(LeagueContainer));