import React from 'react';
import AlertDialog from '../../common/AlertDialog';

interface AuthorizationGoogleDialogProps {
  open: boolean
}

export default function AuthorizationGoogle(props: AuthorizationGoogleDialogProps) {
  const title = "Use Google's location service?";
  const message = "Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running."
  return (
    <div>
      <AlertDialog title={title} message={message} open={props.open}/>
    </div>
  );
}
