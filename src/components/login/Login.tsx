import React from 'react';
import Template from '../template/Template';
import GoogleButton from 'react-google-button';
import * as crypto from 'crypto';
import base64url from "base64url";
import { v4 as uuid} from  "uuid";

function GoogleSignin() {

  const sha256 = (buffer: string) => {
    return crypto.createHash('sha256').update(buffer).digest();
  }

  const generateCodeChallenge = (codeVerifier: string) => {
    return base64url.encode(sha256(codeVerifier));
  }

  const signin = async () => {

    const codeVerifier = uuid();
    const state = uuid();
    window.localStorage.setItem("code_verifier", codeVerifier)
    window.localStorage.setItem("state", state)

    const params = new URLSearchParams();
    params.append('state',state);
    params.append('client_id',process.env.REACT_APP_CLIENT_ID || '');
    params.append('redirect_uri',process.env.REACT_APP_REDIRECT_URI || '');
    params.append('response_type','code');
    params.append('code_challenge',generateCodeChallenge(codeVerifier));

    window.location.assign(`${process.env.REACT_APP_SIGNIN_URI}?${params.toString()}`);
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
