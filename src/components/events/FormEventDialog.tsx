import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DateAndTimePickers from '../common/DateAndTimePickers';
import { createEvent } from '../../lib/events';

export interface FormEventDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export default function FormEventDialog(props: FormEventDialogProps) {

  const { onClose, selectedValue, open } = props;
  const [error, setError] = React.useState<any | null>();
  const [date, setDate] = React.useState<Date | null | undefined> (
    new Date(),
  );

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleCreateEvent = async () => {
    if (!date) {
      return;
    }
    try {
      const _eventCreated = await createEvent({
        date
      });
      setDate(null);
      handleClose();
    } catch(e) {
      setError(e);
    }
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Crie um novo encontro</DialogTitle>
      <DateAndTimePickers date={date} setDate={setDate}/>
      <Button variant="contained" color="primary" onClick={handleCreateEvent}>
        Salvar
      </Button>
    </Dialog>
  );
}
