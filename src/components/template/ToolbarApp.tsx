import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { useStyles } from './Template.css';
import { useHistory } from 'react-router-dom';

export default function ToolbarApp() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Home
            </Link>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Funcionalidades
            </Link>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Suporte
            </Link>
          </nav>
          <Button href="#" color="primary" variant="outlined" className={classes.link} onClick={(event: any)=> history.push("/login") }>
            Login
          </Button>
        </Toolbar>
    </div>
  )
}
