import React from 'react';
import { Event } from '../../../lib/events';
import { useSupporter } from '../../../lib/login';
import AlertDialog from '../../common/AlertDialog';
import ShareButtons from './ShareButtons';

const SELF_URL = process.env.REACT_APP_SELF_URL;
interface ShareMeetingDialogProps {
  open: boolean;
  event: Event | null;
  onClose: () => void;
}

export default function ShareMeetingDialog(props: ShareMeetingDialogProps) {
  const supporter = useSupporter();
  const onAgree = async() => {
  }

  const title = "Deseja compartilhar o evento em suas redes sociais?";
  const url = `${SELF_URL}/s/${supporter?.id}/${props.event?.id}/join`;
  const shareText = "Vou conversar com meu candidato, venha participar!"

  return (
    <div> {}
      <AlertDialog title={title} open={props.open && !!props.event} cancelText="Cancelar" onCancel={() => props.onClose()} agreeText="Confirmar" onAgree={onAgree} >
        {supporter?.id
          && props.event?.id
          &&
          <ShareButtons title={shareText} shareUrl={url} /> }
      </AlertDialog>
    </div>
  );
}
