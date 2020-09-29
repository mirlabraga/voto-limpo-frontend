import { v4 as uuid} from  "uuid";
import * as crypto from 'crypto';
import base64url from "base64url";
import { History } from 'history';
import * as jwt from 'jsonwebtoken';
import { useEffect, useState } from "react";

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

export interface Supporter {
  id: string,
  name: string,
  email: string
}
export const getSupporter = async (): Promise<Supporter> => {
  const claims = jwt.decode(window.localStorage.id_token);
  if (typeof(claims) === 'string' || claims === null) {
    throw new Error('invalid localStore.id_token');
  }
  return {
    id: claims['sub'],
    name: claims['name'],
    email: claims['email'],
  }
}

export const useSupporter = ():Supporter | null => {
  const [supporter, setSupporter] = useState<Supporter|null>(null);

  useEffect(() => {
    getSupporter().then(setSupporter);
  }, []);

  return supporter;
}

/**
 * <code>
 * getSupporter().then(supporter =>{
 *   console.log('supporter', supporter);
 *   console.log('add-scope redirect url', generateAddScopeUrl(supporter.id, "https://www.googleapis.com/auth/contacts.readonly"))
 * })
 * </code>
 * @param supporterId
 * @param scope
 */
export const generateAddScopeUrl = (supporterId: string, scope: string) => {
  const codeVerifier = uuid();
  const state = uuid();
  window.localStorage.setItem("code_verifier", codeVerifier)
  window.localStorage.setItem("state", state)

  const params = new URLSearchParams();
  params.append('state',state);
  params.append('client_id',process.env.REACT_APP_CLIENT_ID || '');
  params.append('redirect_uri',process.env.REACT_APP_REDIRECT_URI || '');
  params.append('response_type','code');
  params.append('scope', scope);
  params.append('code_challenge',generateCodeChallenge(codeVerifier));
  return `${process.env.REACT_APP_BASE_URL}/supporter/${supporterId}/add-scope?${params.toString()}`;
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

export const handleResponses = (history: History, request: Promise<Response>): Promise<Response> => {
  return request.then(result => {
    if (result.status === 403 || result.status === 401) {
      history.push('/login');
      throw new Error('unauthenticated user')
    };
    return result;
  });
}
