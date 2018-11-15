import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  boldCell: {
      fontWeight: 700,
  }
});

const LeagueTable = props => {
  const { classes, teams } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Nazwa drużyny</TableCell>
            <TableCell numeric>RZ</TableCell>
            <TableCell numeric>Z</TableCell>
            <TableCell numeric>R</TableCell>
            <TableCell numeric>P</TableCell>
            <TableCell numeric>BZ</TableCell>
            <TableCell numeric>BS</TableCell>
            <TableCell numeric>RB</TableCell>
            <TableCell numeric className={classes.boldCell}>P</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.length && teams.map(team => {
            return (
              <TableRow key={team.teamId}>
                <TableCell component="th" scope="row">
                  {team.name}
                </TableCell>
                <TableCell numeric>{team.matchesPlayed}</TableCell>
                <TableCell numeric>{team.matchesWon}</TableCell>
                <TableCell numeric>{team.matchesDrawn}</TableCell>
                <TableCell numeric>{team.matchesLost}</TableCell>
                <TableCell numeric>{team.goalsScored}</TableCell>
                <TableCell numeric>{team.goalsLost}</TableCell>
                <TableCell numeric>{team.goalsScored - team.goalsLost}</TableCell>
                <TableCell numeric className={classes.boldCell} >{team.points}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

LeagueTable.propTypes = {
  classes: PropTypes.object.isRequired,
  teams: PropTypes.array.isRequired
};

export default withStyles(styles)(LeagueTable);