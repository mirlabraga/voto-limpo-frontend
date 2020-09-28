import React, { FC, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { getToken } from "../../lib/login";

const LoginCallback: FC<RouteComponentProps> = ({ history, location }) => {

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('state') !== window.localStorage.getItem('state')) {
      return history.push('/');
    }

    getToken(params.get('code') || '', params.get('state') || '')
    .then(() => {
      history.push('/dashboard');
    })
    .catch(() => {
      history.push('/');
    })
  });
  return (
    <div>
      Autenticando resposta...
    </div>
  );
};

export default LoginCallback;
