import React from 'react';
import './stylesheets/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Link, Switch, useHistory, withRouter} from 'react-router-dom';
import Header from './components/Header'
import DeckoCards from './components/DeckoCards'
import Footer from './components/Footer'
import About from './components/about'
import Login from './components/Auth/Login.js';
import Register from './components/Auth/Register.js';
import Library from './components/Library/Library.js';
import Profile from './components/Profile/Profile.js';
import Friends from './components/Profile/Friends.js';
import FriendsList from './components/Profile/FriendsList.js';
import FriendsLibrary from './components/Library/FriendsLibrary.js';
import FrontPage from './components/frontpage';
import history from './history';


export default class App extends React.Component {
  render(){
    return(
      <div className="App">
    <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
      <div>
        <Header/>
        <Switch>
            <Route exact component={withRouter(FrontPage)} path="/" />
            <Route component={withRouter(DeckoCards)} path="/search" />
            <Route component={withRouter(Login)} path="/login" />
            <Route component={withRouter(Register)} path="/signup" />
            <Route component={withRouter(Profile)} path="/profile" />
            <Route component={withRouter(About)} path="/about" />
            <Route component={withRouter(Friends)} path="/friends" />
            <Route component={withRouter(FriendsList)} path="/friendslist" />
            <Route component={withRouter(Library)} path="/library" />
            <Route component={withRouter(FriendsLibrary)} path="/friendslibrary" />
        </Switch>
      </div>
      </Router>
    </div>
  );
 }
}
