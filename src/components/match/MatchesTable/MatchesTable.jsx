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
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    backgroundColor: '#E3F2FD',
  },
  table: {
    minWidth: 700,
    backgroundColor: '#E3F2FD',
  },
  boldCell: {
      fontWeight: 700,
  },
  overline: {
    textAlign: 'center',
    fontSize: 40
  },
  linkRow: {
      cursor:'pointer',
      "&:hover":{
          backgroundColor:'#BBDEFB'
      }
  }
})

const MatchesTable = props => {
    const { classes, matches, round, location,pushIntoRoute } = props;
    return (
        <div>
        {matches.length > 0 &&
        <Paper className={classes.root}>
            <div variant='overline' className={classes.overline}>
                <Typography >
                    Runda:{round}
                </Typography>
            </div>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>Drużyna 1</TableCell>
                    <TableCell>Wynik</TableCell>
                    <TableCell>Drużyna 2</TableCell>
                    <TableCell>Data</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {matches.length && matches.map((match,i) => {
                    return (
                        <TableRow className={classes.linkRow} key={i} onClick={ () => pushIntoRoute(location+"/"+match.id)} >
                            <TableCell >{match.host.name}</TableCell>
                            <TableCell >{match.hostScore}:{match.awayScore}</TableCell>
                            <TableCell >{match.away.name}</TableCell>
                            <TableCell >{match.date.slice(0,10)}</TableCell>
                        </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        </Paper>}
        </div>
    );
}

MatchesTable.propTypes = {
  classes: PropTypes.object.isRequired,
  matches: PropTypes.array.isRequired
};

export default withStyles(styles)(MatchesTable);
