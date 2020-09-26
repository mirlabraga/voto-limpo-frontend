import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { useStyles } from './Home.css';

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

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Funcionalidades
            </Link>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Suporte
            </Link>
          </nav>
          <Button href="#" color="primary" variant="outlined" className={classes.link}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Voto limpo
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          A melhor e mais eficiente forma de interagir com o seu eleitorado. Uma plataforma criada
          com a finalidade de agendar uma conversar, com integração com Calendário e Contatos Google.
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
      </Container>
      <Container maxWidth="md" component="footer" className={classes.footer}>
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
        <Box mt={5}>
        </Box>
      </Container>
    </React.Fragment>
  );
}
