import React from 'react';
import Template from '../template/Template';
import GoogleButton from 'react-google-button'
import { useHistory } from 'react-router-dom';

function GoogleSignin() {
  const history = useHistory();
  const signin = async () => {
    window.location.href = `${process.env.REACT_APP_SIGNIN_URI}?
    state=${process.env.REACT_APP_STATE}&
    client_id=${process.env.REACT_APP_CLIENT_ID}&
    redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&
    response_type=${process.env.REACT_APP_RESPONSE_TYPE}&
    code_challenge=${process.env.REACT_APP_CODE_CHALLEGE}`;
  }

  return (
    <div>
      <GoogleButton
        onClick={ signin }
      />
    </div>
  );
}

export default function Login() {
  return (
    <div>
      <Template page={<GoogleSignin />} />
    </div>
  );
}
