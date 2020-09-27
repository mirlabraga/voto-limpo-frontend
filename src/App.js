import MomentUtils from '@date-io/moment';
import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Login from './components/login/Login';
import Home from './components/home/Home';
import LoginCallback from './components/login/LoginCallback';
import Dashboard from './components/dashboard/Dashboard';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/callback" component={LoginCallback}/>
          <Route exact path="/dashboard" component={Dashboard}/>
        </Switch>
      </Router>
    </MuiPickersUtilsProvider>
  );
}

export default App;
