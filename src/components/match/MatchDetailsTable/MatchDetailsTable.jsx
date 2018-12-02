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
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    top:120,
    marginTop: theme.spacing.unit * 7,
    textAlign:'center'
  },
  left: {
    display:'inline-block',
    marginRight: 50
  },
  right: {
    display:'inline-block'
  },
  table: {
    minWidth: 300,
    backgroundColor: '#E3F2FD'
  },
  boldCell: {
      fontWeight: 700,
      fontSize: 32
  },
  overline: {
    textAlign: 'center',
    fontSize: 40
  },
  playersTable: {
      
    marginTop: theme.spacing.unit * 3,
  }
})

const MatchDetailsTable = props => {
    const { classes, game, round, location,pushIntoRoute, players } = props;
    return (
        <div style={{marginTop: 50}}>
            <Grid className={classes.root} >            
                <div className={classes.boldCell}>{game.host.name} {game.hostScore} - {game.awayScore} {game.away.name}  </div>
                <p>Data meczu: {game.date.slice(0,10)}</p>      
                <p>Godzina: {game.date.slice(11,-7)}</p>                     
                <p>Rozgrywki: {game.league.name}</p>                        
            </Grid>
            <div style={{marginTop: 50, marginBottom: 50}}>
                <Paper className={classes.left}>            
                    <Typography align="center">
                        {game.host.name}
                    </Typography>
                    <Table className="playersTable">
                        <TableHead>
                            <TableRow>
                                <TableCell numeric>Imię</TableCell>
                                <TableCell numeric>Nazwisko</TableCell>
                                <TableCell numeric>Data urodzenia</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {game.host.players && game.host.players.map(player => 
                            <TableRow key={player.id}>
                                <TableCell numeric>{player.firstname}</TableCell>
                                <TableCell numeric>{player.lastname}</TableCell>
                                <TableCell numeric>{player.birthDate.slice(0,10)}</TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </Paper>
                <Paper className={classes.right}>
                    <Typography align="center">
                        {game.away.name}
                    </Typography>
                    <Table className="playersTable">
                        <TableHead>
                            <TableRow>
                                <TableCell numeric>Imię</TableCell>
                                <TableCell numeric>Nazwisko</TableCell>
                                <TableCell numeric>Data urodzenia</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {game.host.players.length > 0 && game.host.players.map(player => 
                            <TableRow key={player.id}>
                                <TableCell numeric>{player.firstname}</TableCell>
                                <TableCell numeric>{player.lastname}</TableCell>
                                <TableCell numeric>{player.birthDate.slice(0,10)}</TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        </div>
        
    );
}

MatchDetailsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired
};

export default withStyles(styles)(MatchDetailsTable);
