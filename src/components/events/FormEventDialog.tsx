import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DateAndTimePickers from '../common/DateAndTimePickers';

export interface FormEventDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export default function FormEventDialog(props: FormEventDialogProps) {

  const { onClose, selectedValue, open } = props;
  const [date, setDate] = React.useState<Date | null | undefined> (
    new Date(),
  );

  const handleClose = () => {
    onClose(selectedValue);
  };

  const createEvent = async () => {
    const response = await fetch(process.env.REACT_APP_CREATE_EVENT_URI || "https://localhost:3000/events", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.localStorage.getItem("id_token")}`
        },
        mode: 'cors',
        body: JSON.stringify({date: date?.toISOString()})
    });
    if (response.ok) {
      setDate(null);
      handleClose();
    }
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Crie um novo encontro</DialogTitle>
      <DateAndTimePickers date={date} setDate={setDate}/>
      <Button variant="contained" color="primary" onClick={createEvent}>
        Salvar
      </Button>
    </Dialog>
  );
}
