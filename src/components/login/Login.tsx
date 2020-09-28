import React from 'react';
import Template from '../template/Template';
import GoogleButton from 'react-google-button';
import { generateLoginUrl } from '../../lib/login';

function GoogleSignin() {

  const signin = async () => {
    window.location.assign(generateLoginUrl());
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
