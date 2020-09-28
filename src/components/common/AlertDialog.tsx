import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface AlertDialogProps {
  title: string,
  message: string,
  open: boolean,
  onCancel: () => void
  onAgree: () => void
}

export default function AlertDialog(props: AlertDialogProps) {

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCancel} color="primary">
            Discordo
          </Button>
          <Button onClick={props.onAgree} color="primary" autoFocus>
            Concordo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
