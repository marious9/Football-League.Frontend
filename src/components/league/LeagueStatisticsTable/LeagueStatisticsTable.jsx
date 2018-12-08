import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    top:120,
    //width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    backgroundColor: "#E3F2FD"
  },
  boldCell: {
      fontWeight: 700,
  },
  overline: {
    textAlign: 'center',
    fontSize: 40
  },
  title: {
    fontSize: 40,
    color: '#fff'  
  }
})

const LeagueStatisticsTable = props => {
  const { classes, statistics, param } = props;
  return (      
    <div className={classes.root}>
        {statistics.length > 0 &&
        <Table className={classes.table}>
            <TableHead>
            <TableRow>                
                <TableCell numeric>Zawodnik</TableCell>
                <TableCell numeric>Nazwa drużyny</TableCell>
                <TableCell numeric className={classes.boldCell}>{props.param}</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {statistics.length && statistics.map((stat,i) => {
                return (
                <TableRow key={i}>
                    <TableCell numeric>{stat.player.firstname + " " + stat.player.lastname }</TableCell>
                    <TableCell numeric>Dodać na backendzie drużynę</TableCell>
                    { param === "Bramki" && <TableCell numeric>{stat.goals}</TableCell> }
                    { param === "Asysty" && <TableCell numeric>{stat.assists}</TableCell> } 
                    { param === "Żółte kartki" && <TableCell numeric>{stat.yellowCards}</TableCell> } 
                    { param === "Czerwone kartki" && <TableCell numeric>{stat.redCards}</TableCell> } 
                </TableRow>
                );
            })}
            </TableBody>
        </Table>}
    </div>
  );
}

LeagueStatisticsTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LeagueStatisticsTable);
