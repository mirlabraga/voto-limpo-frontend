import React from 'react';
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import './DateAndTimePickers.css';
import { Grid } from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface DateAndTimePickersProps {
  date: Date | null | undefined;
  setDate: (date: Date | null | undefined) => void
}

export default function DateAndTimePickers(props: DateAndTimePickersProps) {
  const handleDateChange = (date: MaterialUiPickersDate) => {
    props.setDate(date?.toDate());
  }

  return (
    <Grid container justify="space-around">
      <KeyboardDatePicker
        margin="normal"
        format="DD/MM/yyyy"
        id="date-picker-inline"
        label="Dia do Evento"
        value={props.date}
        defaultValue={props.date}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />

      <KeyboardTimePicker
        margin="normal"
        format="HH:mm"
        id="time-picker"
        label="Hora do Evento"
        value={props.date}
        defaultValue={props.date}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change time',
        }}
      />
    </Grid>
  );
}
