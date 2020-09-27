import React, { FC, useEffect } from "react";
import { RouteComponentProps } from "react-router";

const LoginCallback: FC<RouteComponentProps> = ({ location }) => {
  useEffect(() => {

    const params = new URLSearchParams(location.search);
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
      console.log(data);
      window.localStorage.setItem("id_token", data.id_token);
    });
  });

  return <p>
  </p>;
};

export default LoginCallback;
