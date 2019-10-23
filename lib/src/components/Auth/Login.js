import React from 'react';
import firebase from '../../firebase.js'
import { Link } from 'react-router-dom';
import Login from './Login';

export default class Register extends React.Component{
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
            this.props.history.push('/');
        })
    }




    render(){
        const {email, password} = this.state;
        console.log(this.state); //what will it print?
        return(
          <div>
            <div className = 'authcontainer'>
                <h1> Log In </h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor = 'email'> Email </label>
                        <input type = 'email' name ='email' id = 'email' value = {email} onChange = {this.handleChange} />
                    <label htmlFor = 'password'> Password </label>
                        <input type = 'password' name = 'password' id = 'password' value = {password} onChange ={this.handleChange} />
                    <button className = 'submit' children = 'Lets go!' />
                    {/*<p>Have an account? <Link className = 'login-button' to='./login'> Login here! </Link></p> */}
                </form>
                </div>
                {/*
                  user
                  ? <p>Hello, {this.props.username}</p>
                  : <p>Please sign in.</p>
                */}
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
  return ;
}
}
