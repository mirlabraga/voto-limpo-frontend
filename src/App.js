import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Login from './components/login/Login';
import Home from './components/home/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;
