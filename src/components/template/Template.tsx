import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { useStyles } from './Template.css';
import Footer from './Footer';
import ToolbarApp from './ToolbarApp';

interface TemplateProps {
  page: object
}

export default function Template(props: TemplateProps) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <ToolbarApp/>
      </AppBar>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        { props.page }
      </Container>
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Footer />
      </Container>
    </React.Fragment>
  );
}
