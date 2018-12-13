import React from 'react';
import * as moment from 'moment';
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
  subheader: {
    textAlign: 'center',
    fontSize: 32
  },
  playersTable: {
      
    marginTop: theme.spacing.unit * 3,
  },
  colorWhite: {
      color: '#fff',
      fontWeight: 600
  }
})

const getHostPlayer = (statistic, hostName) => {
    let player = {};
    if(statistic.matchPlayer.player.teamName === hostName) {
        const fullName = statistic.minute + "' " + statistic.matchPlayer.player.firstname + " " + statistic.matchPlayer.player.lastname;
        player = {fullName, id: statistic.matchPlayer.player.id, icon: <i className="fas fa-futbol"></i>}
    }
    return player;
}

const getAwayPlayer = (statistic, awayName) => {
    let player = {};
    if(statistic.matchPlayer.player.teamName === awayName) {
        const fullName = statistic.minute + "' " + statistic.matchPlayer.player.firstname + " " + statistic.matchPlayer.player.lastname;
        player = {fullName, id: statistic.matchPlayer.player.id, icon: <i className="fas fa-futbol"></i>}
    }
    return player;
}

const incrementScore = (statistic, player, hostName) => {
   

}

const MatchDetailsTable = props => {
    const { classes, game, matchStatistics } = props; 
    return (
        <div style={{marginTop: 50}}>
            <Grid className={classes.root} >            
                <div className={classes.boldCell}>
                    {game.host.name} {game.hostScore !== -1 ? game.hostScore : ' - '}{' : '}
                     {game.awayScore !== -1 ? game.awayScore : ' - '} {game.away.name}  </div>
                <p>Data meczu: {moment(game.date).format('DD-MM-YYYY')}</p>      
                <p>Godzina: {moment(game.date).format('hh:mm')}</p>                   
                <p>Rozgrywki: {game.league.name}</p>
            </Grid>
            <div style={{marginTop: 50, marginBottom: 50}}>
                {matchStatistics.length > 0 && <div style={{marginBottom: 50}}>
                    <Typography align="center" className={classes.colorWhite + ' ' + classes.subheader} style={{color:"#fff"}}>
                        Bramki
                    </Typography>
                    <Table>
                        <TableBody>
                            {matchStatistics.map((statistic, index) => {
                                if(statistic.action === 0) return(
                                <TableRow key={index}>
                                    <TableCell className={classes.colorWhite}>                                    
                                        {getHostPlayer(statistic, game.host.name).icon || ''} {' '} 
                                        {getHostPlayer(statistic, game.host.name).fullName || ''}
                                    </TableCell>
                                    <TableCell numeric className={classes.colorWhite}>
                                        {getHostPlayer(statistic, game.away.name).icon || ''} {' '}
                                        {getHostPlayer(statistic, game.away.name).fullName || ''} {' '}
                                    </TableCell>                                                                        
                                </TableRow>)  }
                            )}                     
                        </TableBody>
                    </Table>
                </div>}
                <Paper className={classes.left}>            
                    <Typography align="center" className={classes.subheader}>
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
                                <TableCell numeric>{moment(player.birthDate).format('DD-MM-YYYY')}</TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </Paper>
                <Paper className={classes.right}>
                    <Typography align="center" className={classes.subheader}>
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
                        {game.away.players.length > 0 && game.away.players.map(player => 
                            <TableRow key={player.id}>
                                <TableCell numeric>{player.firstname}</TableCell>
                                <TableCell numeric>{player.lastname}</TableCell>
                                <TableCell numeric>{moment(player.birthDate).format('DD-MM-YYYY')}</TableCell>
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
