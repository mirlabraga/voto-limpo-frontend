import React, { useEffect } from 'react';
import { Event } from '../../../lib/events';
import { generateAddScopeUrl, getSupporter } from '../../../lib/login';
import { useProfileScopes } from '../../../lib/profile';
import AlertDialog from '../../common/AlertDialog';
import { useCreateGoogleCalendar } from '../../../lib/events';

const GOOGLE_CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar.events";

interface GoogleCalendarDialogProps {
  open: boolean;
  event: Event | null;
  onClose: () => void;
}

export default function GoogleCalendarDialog(props: GoogleCalendarDialogProps) {
  console.log('GoogleCalendarDialog', props.event);

  const profileScopes = useProfileScopes();
  const hasCalendarScope = !!profileScopes?.find(scope => scope === GOOGLE_CALENDAR_SCOPE);
  const [createGoogleCalendar, loadingCreateGoogleCalendar] = useCreateGoogleCalendar();

  useEffect(() => {
    if (loadingCreateGoogleCalendar) {
      props.onClose();
    }
  }, [loadingCreateGoogleCalendar]);

  const onAgree = async() => {
    if (props.event?.id) {
      if (hasCalendarScope) {
        createGoogleCalendar(props.event);
      } else {
        const supporter = await getSupporter();
        window.localStorage.setItem('pending_action', 'create_google_calendar');
        window.localStorage.setItem('current_event', props.event?.id);

        window.location.assign(generateAddScopeUrl(supporter.id, GOOGLE_CALENDAR_SCOPE))
      }
    }
  }

  const title = "Use o teu Calendário do Google?";
  return (
    <div> {}
      <AlertDialog title={title} open={props.open && !!props.event} onCancel={() => props.onClose()} onAgree={onAgree} >
        {hasCalendarScope
          ? (
            <>
              <p>
                Ok, temos tudo para criar a reunião no Google Meet e o evento no seu Calendário. <br />
                Nós usaremos essa reunião para adicionar as pessoas que você convidar.
              </p>
            </>)
          : (
            <>
              <p>
                Para o evento ser criado e você conhecer quem irá participar do encontro, nós utilizado o Calendário do Google para salvar a reunião.
                Nós também iremos criar uma reunião virtual no Google Meeting. <br />
                Mas para isso precisaremos que você autorize isso no Google.<br />
                <br/>
                <b>Você concorda adicionar acesso ao seu calendário no Google?</b>
              </p>
            </>)
        }
      </AlertDialog>
    </div>
  );
}
