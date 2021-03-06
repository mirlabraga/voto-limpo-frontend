import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import { styles } from './ListEvents.css'
import FormEventDialog from './FormEventDialog';
import ListTableEvents from './ListTableEvents/ListTableEvents';
import { useEvents } from '../../lib/events';
import { Typography } from '@material-ui/core';

export interface ListEventsProps extends WithStyles<typeof styles> { }

function ListEvents(props: ListEventsProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [rows, loadEvents] = useEvents();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
    loadEvents(true);
  };

  useEffect(() => {
    loadEvents(true);
  }, [])

  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon className={classes.block} color="inherit" />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Procurar por data"
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput,
                }}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" className={classes.addUser} onClick={handleClickOpen}>
                Criar reunião
              </Button>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon className={classes.block} color="inherit" onClick={() => loadEvents(true)} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        {(rows.length > 0) ?
            <>
              <ListTableEvents rows={rows} />
            </>
            :
            <>
            <Typography color="textSecondary" align="center">
              Nenhuma reunião criada para esse cadidato ainda.
            </Typography>
            </>
          }
      </div>
      <FormEventDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </Paper>
  );
}

export default withStyles(styles)(ListEvents);
