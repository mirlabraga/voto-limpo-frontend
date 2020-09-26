import React from 'react';
import { Grid, Link, Typography } from '@material-ui/core';

const footers = [
  {
    title: 'Empresa',
    description: ['Equipe', 'Contacte-nos'],
  },
  {
    title: 'Funcionalidades',
    description: ['Agendar reunião', 'Lembre-me meu eleitor', 'Compartilhar reunião'],
  },
  {
    title: 'Legalidade',
    description: ['Politica de privacidade', 'Termos de uso'],
  },
];

export default function Footer() {
  return (
    <div>
      <Grid container spacing={4} justify="space-evenly">
        {footers.map((footer) => (
          <Grid item xs={6} sm={3} key={footer.title}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              {footer.title}
            </Typography>
            <ul>
              {footer.description.map((item) => (
                <li key={item}>
                  <Link href="#" variant="subtitle1" color="textSecondary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
