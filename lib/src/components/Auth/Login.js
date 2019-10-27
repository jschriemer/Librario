import React from 'react';
import firebase from '../../firebase.js'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Register from './Register';
import './Auth.css';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    handleChange = event => {
		this.setState({[event.target.name]: event.target.value});
	}

    //Submit email and password to firebase database
	handleSubmit = event => {
		event.preventDefault();
        event.preventDefault();
    const {email, password} = this.state;

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      })
        .then(user => {
          console.log("User successfully logged in: " + getUser())
          alert("Welcome back " + getUser() + "!");
          this.props.history.push('/');
        })
    }




    render(){
        const {email, password} = this.state;
        return(
          <div>
            <div className = 'authcontainer'>
                <h1> Log In </h1>
                <br className = "log"></br>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor = 'email'> Email </label>
                        <input type = 'email' name ='email' id = 'email' value = {email} onChange = {this.handleChange} />
                        <br className = "log"></br>
                    <label htmlFor = 'password'> Password </label>
                        <input type = 'password' name = 'password' id = 'password' value = {password} onChange ={this.handleChange} />
                        <br className = "log"></br>
                    <button className = 'submit' children = 'Lets go!' />
                    <br className = "log"></br>
                    <p>Have an account? <Link className = 'login-button' to='./signup'> Sign Up </Link></p>
                </form>
                </div>
              </div>
        )
    }
}

export function getUser(){
  var user = firebase.auth().currentUser;
  if(user !== null){
    var name = user.displayName;
    return name;
  }else{
  return false;
  }
}
