import MomentUtils from '@date-io/moment';
import React, { useEffect } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch, useHistory } from 'react-router-dom'
import Login from './components/login/Login';
import Home from './components/home/Home';
import JoinEvent from './components/join-event/JoinEvent';
import LoginCallback from './components/login/LoginCallback';
import Dashboard from './components/dashboard/Dashboard';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

function CheckPendingActions({children}) {
  const history = useHistory();
  useEffect(()=>{
    if (!history) {
      return;
    }
    switch (window.localStorage.pending_action) {
      case 'create_google_calendar':
        history.push('/dashboard')
        break;

      default:
        break;
    }
  },[history]);
  return children;
}

function App() {

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Router>
        <CheckPendingActions>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/callback" component={LoginCallback}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/s/:supporterId/e/:eventId/join" component={JoinEvent}/>
          </Switch>
        </CheckPendingActions>
      </Router>
    </MuiPickersUtilsProvider>
  );
}

export default App;
