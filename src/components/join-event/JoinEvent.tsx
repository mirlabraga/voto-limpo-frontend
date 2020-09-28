import React, { useEffect, useState } from 'react';
import { Button, Typography } from "@material-ui/core";
import Template from '../template/Template';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useJoinEvent, JoinInfoData } from '../../lib/events';
import { useHistory, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function Presentation() {
  const classes = useStyles();
  const { supporterId, eventId } = useParams<JoinInfoData>();
  const [joinEvent, loadingJoinEvent, joinInfo] = useJoinEvent();
  const [name, setName] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const hasParams = supporterId && eventId;
  const hasAllValues = name && phoneNumber && email && hasParams;

  const handleCreateEvent = () => {
    if (name && phoneNumber && email && hasParams) {
      joinEvent({
        supporterId,
        eventId,
        name,
        email,
        phoneNumber
      })
    }
  }

  useEffect(() => {
    if (joinInfo?.uri) {
      window.location.assign(joinInfo?.uri);
    }
  }, [joinInfo]);

  return (
    <div>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        O dia do Voto
      </Typography>
      { !joinInfo && (
        <>
          <Typography variant="h6" align="center" color="textSecondary" component="p">
            Entre com as suas informções para que possamos te redirecionar para a reunião. Veja como vamos usar seus dados nos <a href="https://www.diadovoto.com/termos-de-uso">termos de uso</a>.
          </Typography>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField value={name} onChange={(e) => setName(e.target.value)} required id="standard-required" fullWidth label="Nome" defaultValue="" />
              <TextField value={email} onChange={(e) => setEmail(e.target.value)} required id="standard-required" fullWidth label="Email" defaultValue="" />
              <TextField value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required id="standard-required" fullWidth label="Telefone" defaultValue="" />


              <Button disabled={!hasAllValues || loadingJoinEvent} variant="contained" color="primary" onClick={handleCreateEvent}>
                Aceitar Termos
              </Button>
            </div>
          </form>
        </>)}
        { joinInfo && !joinInfo.uri && (
          <>
            <Typography variant="h6" align="center" color="textSecondary" component="p">
              A sala de reunião ainda não foi criada, mas não se preocupe, vamos te enviar um email quando estiver tudo ok!
            </Typography>
          </>
        ) }
    </div>
  );
}

export default function JoinEvent() {
  return (
    <div>
      <Template page={<Presentation />} />
    </div>
  );
}
