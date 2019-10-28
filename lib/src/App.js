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
import Profile from './components/Profile/Profile.js';
import Library from './components/Library/Library.js';
import * as login from './components/Auth/Login.js';



export default class App extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          isLoggedIn: false,
      }
  }
render(){
  console.log("Current User: " + login.getUser())
  return (
  <div className="App">
    <Router>
      <div>
        <Header isLoggedIn={this.state.isLoggedIn}/>
        <Switch>
            <Route exact component={withRouter(DeckoCards)} path="/" />
            <Route component={withRouter(Login)} path="/login" />
            <Route component={withRouter(Register)} path="/signup" />
            <Route component={withRouter(Profile)} path="/profile" />
            <Route component={withRouter(Library)} path="/library" />
        </Switch>
      </div>
      </Router>
    </div>
  );
 }
}

export function logOut() {
    this.setState({loggedIn: false});
}
