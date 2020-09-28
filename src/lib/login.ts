import { v4 as uuid} from  "uuid";
import * as crypto from 'crypto';
import base64url from "base64url";

const sha256 = (buffer: string) => {
return crypto.createHash('sha256').update(buffer).digest();
}

const generateCodeChallenge = (codeVerifier: string) => {
return base64url.encode(sha256(codeVerifier));
}

export const generateLoginUrl = () => {
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
    return `${process.env.REACT_APP_SIGNIN_URI}?${params.toString()}`;
}

export const getToken = async(code: string, state: string) => {
    if (state !== window.localStorage.getItem('state')) {
        throw new Error('invalid state');
    }

    const params = new URLSearchParams();
    params.append('code', code);
    params.append('state', state);
    params.append('code_verifier', window.localStorage.getItem("code_verifier") || "");

    const response = await fetch(process.env.REACT_APP_TOKEN_URI || "https://localhost:3000/token", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      mode: 'cors',
      body: params.toString()
    });
    const data = await response.json();
    window.localStorage.setItem("id_token", data.id_token);
}