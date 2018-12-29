import React from 'react';
import { connect } from 'react-redux';
import {getStatisticsActionCreator} from '../../../store/actions/League';
import Spinner from '../../../components/UI/spinner/spinner';
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

    

    render(){
        const {statistics} = this.props;
        const {isStatsLoading} = this.state;
        return(
            <Grid 
            container
            direction="row"
            justify="center"
          >
            <div style={{top:"100px", textAlign: 'center', margin: 0, position:'absolute'}}>
                {isStatsLoading ? <Spinner /> : <StatTab statistics={statistics ? statistics : [] }/>}
                    
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