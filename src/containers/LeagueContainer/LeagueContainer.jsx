import React from 'react';
import { connect } from 'react-redux';
import {getLeagueByIdActionCreator} from '../../store/actions/League';
import Spinner from '../../components/UI/spinner/spinner';
import CardButton from '../../components/UI/cardButton/CardButton';
import {Grid, Typography} from '@material-ui/core/'

class LeagueContainer extends React.Component{
    state = {
        isLeagueLoading: true,
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
        setTimeout( () => {
            this.props.getLeagueById(this.props.match.params.id);
            
            this.setState({isLeagueLoading: false});
        }, 2000)        
    }

    render(){
        const {league} = this.props;
        const {isLeagueLoading} = this.state;
        return(
            <Grid 
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
                {isLeagueLoading ? <Spinner /> :
                    <Grid style={{width:'100%', top:"100px", textAlign: 'center', margin: 0}}>               
                        <Typography align="center" style={{fontSize:33, color:'#fff', marginBottom:20}}>{league.name}</Typography>
                        <CardButton name="Mecze" path={`${this.props.history.location.pathname}/match`} /> 
                        <CardButton name="Statystyki" path={`${this.props.history.location.pathname}/statistics`} />                        
                        <CardButton name="Tabela" path={`${this.props.history.location.pathname}/table`} /> 
                        <CardButton name="Drużyny" path={`${this.props.history.location.pathname}/teams`} />                                                             
                    </Grid> 

                }
                    
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {    
        league: state.League.league
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getLeagueById: leagueId => dispatch(getLeagueByIdActionCreator(leagueId))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(LeagueContainer);