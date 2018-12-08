import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import LeagueStatisticsTable from '../league/LeagueStatisticsTable/LeagueStatisticsTable';

const TabContainer = props => {
  return (
    <Typography component="div">
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const tabsNames = {
    GOALS: "Bramki",
    ASSISTS: "Asysty",
    YELLOW_CARDS: "Żółte kartki",
    RED_CARDS: "Czerwone kartki"
}

const styles = theme => ({
  root: {
    width:800,
    flexGrow: 1,
    backgroundColor: "#E3F2FD"
  },
});

class StatTab extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  sortBy(param) {
    const {statistics} = this.props;
    switch(param){
        case tabsNames.GOALS:
            return statistics.sort((a,b) => b.goals-a.goals).slice(0,10);
        case tabsNames.ASSISTS:
            return statistics.sort((a,b) => b.assists-a.assists).slice(0,10);
        case tabsNames.YELLOW_CARDS:
            return statistics.sort((a,b) => b.yellowCards-a.yellowCards).slice(0,10);
        case tabsNames.RED_CARDS:
            return statistics.sort((a,b) => b.redCards-a.redCards).slice(0,10);
        default:
            break;
    }
}

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs centered value={value} onChange={this.handleChange}> 
            <Tab label={tabsNames.GOALS} />
            <Tab label={tabsNames.ASSISTS} />
            <Tab label={tabsNames.YELLOW_CARDS} />
            <Tab label={tabsNames.RED_CARDS} />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer> <LeagueStatisticsTable statistics={this.sortBy(tabsNames.GOALS)} param={tabsNames.GOALS}/> </TabContainer>}
        {value === 1 && <TabContainer> <LeagueStatisticsTable statistics={this.sortBy(tabsNames.ASSISTS)} param={tabsNames.ASSISTS}/>  </TabContainer>}
        {value === 2 && <TabContainer> <LeagueStatisticsTable statistics={this.sortBy(tabsNames.YELLOW_CARDS)} param={tabsNames.YELLOW_CARDS}/> </TabContainer>}        
        {value === 3 && <TabContainer> <LeagueStatisticsTable statistics={this.sortBy(tabsNames.RED_CARDS)} param={tabsNames.RED_CARDS}/> </TabContainer>}
      </div>
    );
  }
}

StatTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatTab);