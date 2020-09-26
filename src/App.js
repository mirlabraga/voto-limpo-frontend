import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Login from './components/login/Login';
import Template from './components/template/Template';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Template}/>
        <Route exact path="/login" component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;
