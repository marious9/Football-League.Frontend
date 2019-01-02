import React from 'react';
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
    overflowX: 'auto'
  },
  table: {
    minWidth: 700,
    // backgroundColor: "#E3F2FD",    
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  cell: {
    fontWeight: 500,
    color: '#fff' 
  },
  boldCell: {
      fontWeight: 700,
      color: '#fff' 
  },
  overline: {
    textAlign: 'center',
    fontSize: 40
  },
  title: {
    fontSize: 40,
    color: '#fff'  
  },
  redirectCell: {
    color: 'white',
    cursor: 'pointer',
    '&:hover':{
      backgroundColor: '#fff',
      color: '#000'
    }
  }
})

const LeagueTable = props => {
  const { classes, teams, league, pushIntoRoute, location } = props;
  return (      
    <div className={classes.root}>
        <div>
            <Typography align="center" className={classes.title}>                
                {teams.length > 0 ? league.name :
                <span style={{fontSize:30, paddingTop:50, color:"#fff"}}>{league.name} nie zawiera drużyn.</span>}
            </Typography>
        </div>
        {teams.length > 0 &&
        <Table className={classes.table}>
            <TableHead>
            <TableRow>
                <TableCell className={classes.cell}>Nazwa drużyny</TableCell>
                <TableCell className={classes.cell} numeric>RZ</TableCell>
                <TableCell className={classes.cell} numeric>Z</TableCell>
                <TableCell className={classes.cell} numeric>R</TableCell>
                <TableCell className={classes.cell} numeric>P</TableCell>
                <TableCell className={classes.cell} numeric>BZ</TableCell>
                <TableCell className={classes.cell} numeric>BS</TableCell>
                <TableCell className={classes.cell} numeric>RB</TableCell>
                <TableCell numeric className={classes.boldCell}>P</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {teams.length && teams.map(team => {
                return (
                <TableRow key={team.teamId}>
                    <TableCell component="th" scope="row" className={classes.redirectCell} onClick={() => pushIntoRoute(location+team.teamId)}>
                    {team.name}
                    </TableCell>
                    <TableCell className={classes.cell} numeric>{team.matchesPlayed}</TableCell>
                    <TableCell className={classes.cell} numeric>{team.matchesWon}</TableCell>
                    <TableCell className={classes.cell} numeric>{team.matchesDrawn}</TableCell>
                    <TableCell className={classes.cell} numeric>{team.matchesLost}</TableCell>
                    <TableCell className={classes.cell} numeric>{team.goalsScored}</TableCell>
                    <TableCell className={classes.cell} numeric>{team.goalsLost}</TableCell>
                    <TableCell className={classes.cell} numeric>{team.goalsBilans}</TableCell>
                    <TableCell  numeric className={classes.boldCell} >{team.points}</TableCell>
                </TableRow>
                );
            })}
            </TableBody>
        </Table>}
    </div>
  );
}

LeagueTable.propTypes = {
  classes: PropTypes.object.isRequired,
  teams: PropTypes.array.isRequired
};

export default withStyles(styles)(LeagueTable);
