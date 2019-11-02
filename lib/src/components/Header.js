import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import '../stylesheets/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from "reactjs-popup";
import Login from './Auth/Login';
import Register from './Auth/Register';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import * as login from './Auth/Login.js';
import * as ps from './Profile/ProfileSettings.js';
import * as register from './Auth/Register.js';
import firebase, {auth, provider} from '../firebase.js'

//import Login from './Login';



const green = 'teal';
const gold = '#FFC300';


export default class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      color: green,
      user: false
    };
    this.changeColor = this.changeColor.bind(this);
  }

  usercheck(){
    if(!ps.isloggedOut()){
      if(this.state.user === false)
        this.setState({user: true});
      return true
    }
    return false
  }

  componentDidMount(){
        console.log("componentDidMount")
        auth.onAuthStateChanged(user => {
        if(user){
            this.setState({user: true});
            }
        });
    }

  changeColor(){
    const newColor = this.state.color == green ? gold : green;
    this.setState({color: newColor});
  }

    render(){
      console.log("header " + this.state.user);
      if(this.state.user &&  this.usercheck()){
        return(
          <nav className="navbar navbar-expand-lg" style ={{background: this.state.color}}>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item active">
                  <Link to='/' class="nav-link" href="#"> <img src={ require('../images/book.png') } style ={{width: '30px'}}/> <span class="sr-only">(current)</span></Link>
                </li>
                <li class="nav-item">
                  <Link to= '/profile' className="nav-link" href="/profile">{login.getUser()}</Link>
                </li>
                <li class="nav-item">
                  <Link to='/library' class="nav-link" href="/library">Library</Link>
                </li>
              </ul>
              <button className = 'themebtn' onClick = {this.changeColor} style = {{float: 'right'}}> </button>
            </div>
          </nav>
        );
      }
        return(
          <nav className="navbar navbar-expand-lg" style ={{background: this.state.color}}>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item active">
                  <Link to='/' class="nav-link" href="#"> <img src={ require('../images/book.png') } style ={{width: '30px'}}/> <span class="sr-only">(current)</span></Link>
                </li>
                <li class="nav-item">
                  <Link to='/login' class="nav-link" href="/login">Login</Link>
                </li>
              </ul>
              <button className = 'themebtn' onClick = {this.changeColor} style = {{float: 'right'}}> </button>
            </div>
          </nav>
        );
    }
}
