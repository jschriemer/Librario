import React from 'react';
import './stylesheets/App.css';
import Header from './components/Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import DeckoCards from './components/DeckoCards'
import Form from 'react-bootstrap/Form'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import Login from './components/Auth/Login.js';
import Register from './components/Auth/Register.js';



function App() {
  return (
  <div className="App">
    <Router>
      <div>
        <Header />
        <Switch>
            <Route exact component={withRouter(DeckoCards)} path="/" />
            <Route component={withRouter(Login)} path="/login" />
            <Route component={withRouter(Register)} path="/signup" />
        </Switch>
      </div>
      </Router>
    </div>
  );
}

export default App;
