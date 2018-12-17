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
  },
  yellowCard: {
      color: 'yellow'
  },  
  redCard: {
    color: 'red'
}
})

const getPlayer = (statistic, hostName, deleteFunction) => {
    let player = {};
    if(statistic.matchPlayer.player.teamName === hostName) {
        const fullName = statistic.minute + "' " + statistic.matchPlayer.player.firstname + " " + statistic.matchPlayer.player.lastname;
        player = {fullName, id: statistic.matchPlayer.player.id,
            icon: <i onClick={ () => deleteFunction(statistic.id)} className="fas fa-futbol" 
            style={{cursor:'pointer', '&:hover':{color:'#ef5350'}}}></i>}
    }
    return player;
}

const getPlayerStatistic = (statistics, playerId) => {
        return statistics.filter(stat => stat.action !== 0 && stat.action !== 1 && stat.matchPlayer.playerId === playerId)    
}

const MatchDetailsTable = props => {
    const { classes, game, matchStatistics, onOpenDeleteStatisticModal } = props; 
    console.log(matchStatistics);
    return (
        <div style={{marginTop: 60}}>
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
                                        {getPlayer(statistic, game.host.name, onOpenDeleteStatisticModal).icon || ''} {' '} 
                                        {getPlayer(statistic, game.host.name, onOpenDeleteStatisticModal).fullName || ''}
                                    </TableCell>
                                    <TableCell numeric className={classes.colorWhite}>
                                        {getPlayer(statistic, game.away.name, onOpenDeleteStatisticModal).icon || ''} {' '}
                                        {getPlayer(statistic, game.away.name, onOpenDeleteStatisticModal).fullName || ''} {' '}
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
                                <TableCell numeric>Statystyka</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {game.host.players && game.host.players.map(player => 
                            <TableRow key={player.id}>
                                <TableCell numeric>{player.firstname}</TableCell>
                                <TableCell numeric>{player.lastname}</TableCell>
                                <TableCell numeric>{getPlayerStatistic(matchStatistics, player.id).map((pStat, index) =>
                                    <span key={index}>
                                        <i className='fas fa-stop' onClick={ () => onOpenDeleteStatisticModal(pStat.id)} 
                                            style={{color: pStat.action === 2 ? 'yellow' : 'red', marginRight: 2, cursor:'pointer'}} />
                                        {pStat.minute}'
                                    </span>
                                )}</TableCell>
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
                                <TableCell numeric>Statystyka</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {game.away.players.length > 0 && game.away.players.map(player => 
                            <TableRow key={player.id}>
                                <TableCell numeric>{player.firstname}</TableCell>
                                <TableCell numeric>{player.lastname}</TableCell>
                                <TableCell numeric>{getPlayerStatistic(matchStatistics, player.id).map((pStat, index) =>
                                    <span key={index}>
                                        <i className='fas fa-stop' onClick={ () => onOpenDeleteStatisticModal(pStat.id)}
                                            style={{color: pStat.action === 2 ? 'yellow' : 'red', marginRight: 2, cursor:'pointer'}} />
                                        {pStat.minute}'
                                    </span>
                                )}</TableCell>
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
