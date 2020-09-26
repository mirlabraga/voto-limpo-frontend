import React from 'react';
import { Typography } from "@material-ui/core";

function Presentation() {
  return (
    <div>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Voto limpo
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" component="p">
        A melhor e mais eficiente forma de interagir com o seu eleitorado. Uma plataforma criada
        com a finalidade de agendar uma conversar, com integração com Calendário e Contatos Google.
      </Typography>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <Presentation/>
    </div>
  );
}
