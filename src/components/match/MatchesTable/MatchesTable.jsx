import React from 'react';
import * as moment from 'moment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
    top:120,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    marginBottom: 50,
  },
  table: {
    minWidth: 700,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  boldCell: {
      fontWeight: 700,
      color: '#fff',
  },
  overline: {
    textAlign: 'center',
    fontSize: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  linkRow: {
      cursor:'pointer',
      "&:hover":{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      }
  },
  cell: {
    fontWeight: 500,
    color: '#fff' 
  },
})

const MatchesTable = props => {
    const { classes, matches, round, location,pushIntoRoute } = props;
    return (
        <div>
        {matches.length > 0 &&
        <div className={classes.root}>
            <div variant='overline' className={classes.overline}>
                <Typography style={{color: '#fff'}} >
                    Runda:{round}   
                </Typography>
            </div>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell className={classes.cell}>Drużyna 1</TableCell>
                    <TableCell className={classes.cell}>Wynik</TableCell>
                    <TableCell className={classes.cell}>Drużyna 2</TableCell>
                    <TableCell className={classes.cell}>Data</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {matches.length && matches.map((match,i) => {
                    return (
                        <TableRow className={classes.linkRow} key={i} onClick={ () => pushIntoRoute(location+"/"+match.id)} >
                            <TableCell className={classes.cell}>{match.host.name}</TableCell>
                            <TableCell className={classes.cell}>{match.hostScore === -1 ? '-' : match.hostScore}:{match.awayScore === -1 ? '-' : match.awayScore}</TableCell>
                            <TableCell className={classes.cell}>{match.away.name}</TableCell>
                            <TableCell className={classes.cell}>{moment(match.date).format('DD-MM-YYYY')}</TableCell>
                        </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        </div>}
        </div>
    );
}

MatchesTable.propTypes = {
  classes: PropTypes.object.isRequired,
  matches: PropTypes.array.isRequired
};

export default withStyles(styles)(MatchesTable);
