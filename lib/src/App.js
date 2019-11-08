import React from 'react';
import './stylesheets/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Link, Switch, useHistory, withRouter} from 'react-router-dom';
import Header from './components/Header'
import DeckoCards from './components/DeckoCards'
import Footer from './components/Footer'
import Login from './components/Auth/Login.js';
import Register from './components/Auth/Register.js';
import Library from './components/Library/Library.js';
import Profile from './components/Profile/Profile.js';


export default class App1 extends React.Component {
  render(){
    return(
      <div className="App">
    <Router>
      <div>
        <Header/>
        <Switch>
            <Route exact component={withRouter(DeckoCards)} path="/" />
            <Route component={withRouter(Login)} path="/login" />
            <Route component={withRouter(Register)} path="/signup" />
            <Route component={withRouter(Profile)} path="/profile" />
            <Route component={withRouter(Library)} path="/library" />
        </Switch>
        <Footer />
      </div>
      </Router>
    </div>
  );
 }
}
