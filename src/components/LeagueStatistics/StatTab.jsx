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
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class StatTab extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs centered value={value} onChange={this.handleChange}> 
            <Tab label="Bramki" />
            <Tab label="Asysty" />
            <Tab label="Żółte kartki" />
            <Tab label="Czerwone kartki" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer> <LeagueStatisticsTable statistics={this.props.statistics} param="Bramki"/> </TabContainer>}
        {value === 1 && <TabContainer> <LeagueStatisticsTable statistics={this.props.statistics} param="Asysty"/>  </TabContainer>}
        {value === 2 && <TabContainer> <LeagueStatisticsTable statistics={this.props.statistics} param="Żółte kartki"/> </TabContainer>}        
        {value === 3 && <TabContainer> <LeagueStatisticsTable statistics={this.props.statistics} param="Czerwone kartki"/> </TabContainer>}
      </div>
    );
  }
}

StatTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatTab);