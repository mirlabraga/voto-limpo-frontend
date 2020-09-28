import React from 'react';
import AlertDialog from '../../common/AlertDialog';

interface GoogleCalendarDialogProps<T> {
  open: boolean;
  selectedValue: T;
  onClose: () => void;
}

export default function GoogleCalendarDialog<T>(props: GoogleCalendarDialogProps<T>) {

  const title = "Use o teu Calendário do Google?";
  const message = "Para o evento ser criado e você conhecer quem irá participar do encontro, nós utilizado o Calendário do Google para salvar a reunião. "+
    "Você concorda adicionar acesso ao seu calendário no Google?"
  return (
    <div>
      <AlertDialog title={title} message={message} open={props.open} onCancel={() => props.onClose()} onAgree={() => props.onClose()} />
    </div>
  );
}
