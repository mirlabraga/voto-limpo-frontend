import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { useStyles } from './Template.css';
import Home from '../home/Home'
import Footer from './Footer';
import ToolbarApp from './ToolbarApp';

export default function Template() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <ToolbarApp/>
      </AppBar>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Home />
      </Container>
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Footer />
      </Container>
    </React.Fragment>
  );
}
