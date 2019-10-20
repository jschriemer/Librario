import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import '../stylesheets/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../firebase.js'
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";
//import Login from './Login';



const green = 'teal';
const gold = '#FFC300';

export default class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      color: green,
      username: '',
      email: '',
      password: ''
    };
    this.changeColor = this.changeColor.bind(this);
  }

  handleChange = event => {
		this.setState({[event.target.name]: event.target.value});
	}

    //Submit email and password to firebase database
	handleSubmit = event => {
		event.preventDefault();
    event.preventDefault();
    const {email, password, username} = this.state;

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      })
        .then(user => {
            this.props.history.push('/');
        })

        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
  	        .then(() => {
  	            const user = firebase.auth().currentUser;
  	            user
  	                .updateProfile({displayName: username})
  		            .then(() => {
  		                this.props.history.push('/');
  		            })
              })

    }

  changeColor(){
    const newColor = this.state.color == green ? gold : green;
    this.setState({color: newColor});
  }

    render(){
      const {email, password, username} = this.state;
        return(
  <nav className="navbar navbar-expand-lg" style ={{background: this.state.color}}>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="#"> <img src={ require('../images/book.png') } style ={{width: '30px'}}/> <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Friends</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Community</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Global</a>
        </li>
      </ul>
      <Popup trigger={<button className = 'logIn' style = {{float: 'right'}}>Login</button>} position="bottom">
        <div className = 'authcontainer' style = {{background: this.state.color}}>
          <p> Log In </p>
              <form onSubmit={this.handleSubmit}>
                  <label htmlFor = 'email'> Email </label>
                          <input type = 'email' name ='email' id = 'email' value = {email} onChange = {this.handleChange} />
                      <label htmlFor = 'password'> Password </label>
                          <input type = 'password' name = 'password' id = 'password' value = {password} onChange ={this.handleChange} />
                      <button className = 'submit' children = 'Lets go!' />
                      </form>
          </div>
      </Popup>
      <Popup trigger={<button className = 'signUp' style = {{float: 'right'}} >Sign Up</button>} position="bottom">
      <div className = 'authcontainer' style = {{background: this.state.color}}>
              <p> Registration </p>
              <form onSubmit={this.handleSubmit}>
                  <label htmlFor = 'username'> Username </label>
                      <input type = 'text' name = 'username' id ='username' value = {username} onChange = {this.handleChange} />
                  <label htmlFor = 'email'> Email </label>
                      <input type = 'email' name ='email' id = 'email' value = {email} onChange = {this.handleChange} />
                  <label htmlFor = 'password'> Password </label>
                      <input type = 'password' name = 'password' id = 'password' value = {password} onChange ={this.handleChange} />
                  <button className = 'submit' children = 'Lets go!' />
              </form>
              </div>
      </Popup>
      <button className = 'themebtn' onClick = {this.changeColor} style = {{float: 'right'}}> </button>
    </div>
  </nav>
        );
    }
}

export function getUser(){
  var user = firebase.auth().currentUser;
  if(user !== null){
    var name = user.displayName;
    return name;
  }else{
  return undefined;
}
}
