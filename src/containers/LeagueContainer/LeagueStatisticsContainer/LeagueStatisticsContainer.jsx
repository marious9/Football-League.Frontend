import React from 'react';
import { connect } from 'react-redux';
import {getStatisticsActionCreator} from '../../../store/actions/League';
import Spinner from '../../../components/UI/spinner/spinner';
import LeagueTable from '../../../components/league/LeagueTable/LeagueTable';
import StatTab from '../../../components/LeagueStatistics/StatTab';
import { Grid } from '@material-ui/core/'

class LeagueStatisticsContainer extends React.Component{
    state = {
        isStatsLoading: true
    }

    componentDidMount() {
        setTimeout( () => {
            this.props.getStatistics(this.props.match.params.id);
            
            this.setState({isStatsLoading: false});
        }, 2000)        
    }

    sortBy(param) {
        const {statistics} = this.props;
        switch(param){
            case "GOALS":
                return statistics.sort((a,b) => b.goals-a.goals);
            case "ASSISTS":
                return statistics.sort((a,b) => b.assists-a.assists);
            case "YELLOW_CARDS":
                return statistics.sort((a,b) => b.yellowCards-a.yellowCards);
            case "RED_CARDS":
                return statistics.sort((a,b) => b.redCards-a.redCards);
            default:
                break;
        }
    }

    render(){
        const {statistics} = this.props;
        const {isStatsLoading} = this.state;
        statistics ? console.log(this.sortBy("ASSISTS")) : console.log("twoja stara");
        return(
            <Grid 
            container
            direction="row"
            justify="center"
          >
            <div style={{width:'100%', top:"100px", textAlign: 'center', margin: 0, position:'absolute'}}>
                <StatTab statistics={statistics} param="goals"/>
                    
            </div>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {    
        statistics: state.League.statistics
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getStatistics: leagueId => dispatch(getStatisticsActionCreator(leagueId))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(LeagueStatisticsContainer);