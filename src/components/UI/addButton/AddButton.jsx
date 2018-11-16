import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Tooltip } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

const AddButton = props => {
  const { classes, action, tooltip } = props;
  return (
    <div>
      <Tooltip title= {tooltip}>
        <Button label="Dodaj" variant="fab" color="primary" aria-label="Add" className={classes.button} onClick={() => action()}>
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
