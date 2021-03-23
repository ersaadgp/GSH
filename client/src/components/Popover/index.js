import { makeStyles } from '@material-ui/core/styles';

import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.grey[800],
    textAlign: 'center',
    margin: theme.spacing(),
  },
}));

function Popover({ title, message, onClose, visibility, icon }) {
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const renderIcon = () => {
    return icon === null ? undefined : (
      <div className={classes.root}>{icon}</div>
    );
  };

  return (
    <>
      <Dialog
        open={visibility}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {renderIcon()}
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Popover;
