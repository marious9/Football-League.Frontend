import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, Typography} from '@material-ui/core/';
import { Link } from 'react-router-dom';

const styles = theme => ({
    card: {
        width: 400,
        backgroundColor: "#FF0068",
        '&:hover': {
            backgroundColor: "#e0085f",
          },
        height: 200,
        textAlign: 'center',
        display: 'inline-block', 
        marginLeft: theme.spacing.unit
    },
    secondCard: {
        width: 400,
        backgroundColor: "#FF0068",
        '&:hover': {
            backgroundColor: "#e0085f",
          },
        height: 200,
        textAlign: 'center',
        display: 'inline-block'
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
        float: "left",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
  });

const CardButton = props => {
    const {path, classes, name} = props;
    return (        
        <Link to={path}>
            <Card className={props.wide ?  classes.wideCard : props.secondCard ? classes.secondCard : classes.card}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
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