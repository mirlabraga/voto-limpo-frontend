import React, { FC, useEffect } from "react";
import { Redirect, RouteComponentProps } from "react-router";

const LoginCallback: FC<RouteComponentProps> = ({ history, location }) => {

  useEffect(() => {

    const params = new URLSearchParams(location.search);
    if (params.get('state') != window.localStorage.getItem('state')) {
      return history.push('/');
    }

    params.append('code_verifier', window.localStorage.getItem("code_verifier") || "");

    fetch(process.env.REACT_APP_TOKEN_URI || "https://localhost:3000/token", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      mode: 'cors',
      body: params.toString()
    }).then(response => {
      return response.json()
    }).then(data => {
      window.localStorage.setItem("id_token", data.id_token);
    });
  });
  return (
    <Redirect to="/dashboard" />
  );
};

export default LoginCallback;
