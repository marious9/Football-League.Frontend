import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Tooltip } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor:"#36FFD9",
    '&:hover': {
        backgroundColor: "#3feac8",
      },
  },
  buttonLeft: {
    right:380,
    margin: theme.spacing.unit,
    backgroundColor:"#0c48c9",
    '&:hover': {
        backgroundColor: "#0a3ba4",
      },
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

const AddButton = props => {
  const { classes, action, tooltip, left } = props;
  return (
    <div>
      <Tooltip title= {tooltip}>
        <Button label="Dodaj" variant="fab" color="primary" aria-label="Add" className={left ? classes.buttonLeft : classes.button} onClick={() => action()}>
          <AddIcon />
        </Button>
      </Tooltip>
    </div>
  );
}

AddButton.propTypes = {
  classes: PropTypes.object.isRequired,
  tooltip: PropTypes.string,
};

export default withStyles(styles)(AddButton);
