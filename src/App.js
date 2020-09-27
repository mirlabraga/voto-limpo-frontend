import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Login from './components/login/Login';
import Home from './components/home/Home';
import LoginCallback from './components/login/LoginCallback';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/callback" component={LoginCallback}/>
        <Route exact path="/dashboard" component={Dashboard}/>
      </Switch>
    </Router>
  );
}

export default App;
