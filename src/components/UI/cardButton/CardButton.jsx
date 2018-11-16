import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, Typography} from '@material-ui/core/';
import { Link } from 'react-router-dom';

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

const CardButton = props => {
    const {path, classes, name} = props;
    return (
        <Link to={path}>
            <Card className={classes.card}>
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