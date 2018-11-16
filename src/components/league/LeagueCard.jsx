import React from 'react';
import './LeagueCard.css'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, Typography} from '@material-ui/core/';

const styles = {
    card: {
      width: 400,
      backgroundColor: "#E91E63",
      height: 200,
      textAlign: 'center',
      display: 'inline-block', 
      marginRight: '10px',
      marginRottom: '10px'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 40,
      position: "relative",
      float: "left",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    },
  };

const LeagueCard = props => {

    return (
        <Card className={props.classes.card}>
            <Typography className={props.classes.title} color="textSecondary" gutterBottom>
                {props.league.name}
            </Typography>
            <Typography className={props.classes.pos} color="textSecondary" gutterBottom>
                {props.league.quantity}
            </Typography>
        </Card>
    );
}
LeagueCard.propTypes = {
    classes: PropTypes.object.isRequired,
    league: PropTypes.object.isRequired,
  };

export default withStyles(styles)(LeagueCard);