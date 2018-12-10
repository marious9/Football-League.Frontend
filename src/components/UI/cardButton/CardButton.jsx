import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, Typography} from '@material-ui/core/';
import { Link } from 'react-router-dom';

const styles = theme => ({
    link: {
        position:'relative',
    },
    card: {
        width: 650,
        backgroundColor: "#757de8",
        '&:hover': {
            backgroundColor: "#002984",
          },
        height: 270,
        //textAlign: 'center',
        display: 'inline-block', 
        margin: theme.spacing.unit
    },
    secondCard: {
        width: 350,
        backgroundColor: "#757de8",
        '&:hover': {
            backgroundColor: "#002984",
          },
        height: 200,
        textAlign: 'center',
        display: 'inline-block',
        margin: theme.spacing.unit*2
    },
    wideCard: {
        width: 810,
        backgroundColor: "#1657E7",
        '&:hover': {
            backgroundColor: "#0c48c9",
          },
        height: 200,
        textAlign: 'center',
        display: 'inline-block',
        marginTop: theme.spacing.unit,
        marginLeft: 10
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        color: "#fff",
        fontSize: 40,
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    matchText: {
        color: "#fff",
        fontSize: 24,
        position: "relative",
        float: "left",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }
  });

const CardButton = props => {
    const {path, classes, name, matchText} = props;
    return (        
        <Link to={path} className={classes.link}>
            <Card className={props.wide ?  classes.wideCard : props.secondCard ? classes.secondCard : classes.card}>
                <Typography align="center" className={matchText ? classes.matchText : classes.title} color="textSecondary" gutterBottom>
                    {name}
                </Typography>
            </Card>
        </Link>
    );
}
CardButton.propTypes = {
    classes: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    name: PropTypes.string
  };

export default withStyles(styles)(CardButton);