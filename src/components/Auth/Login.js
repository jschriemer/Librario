import React, {useState} from 'react';
import firebase from '../../firebase.js'
import { Link } from 'react-router-dom';
import './Auth.css';

var errorflag = 0;

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: getUser(),
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
    const {email, password} = this.state;

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          alert("Welcome back " + getUser() + "!");
          const content = "Welcome back " + getUser() + "!"
          this.props.history.push('/');
          window.location.reload();
        })
        .catch(function(error) {
        var errorMessage = error.message;
        alert(errorMessage);
      })
    }

    render(){
        const {email, password} = this.state;
        return(
          <div>
            <div className = 'authcontainer'>
                <h1 style = {{color: "white"}}> Log In </h1>
                <br className = "log"></br>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor = 'email'></label>
                        <input className = 'inputBox' placeholder = 'Email' type = 'email' name ='email' id = 'email' value = {email} onChange = {this.handleChange} />
                        <br className = "log"></br>
                    <label htmlFor = 'password'></label>
                        <input className = 'inputBox' placeholder = 'Password' type = 'password' name = 'password' id = 'password' value = {password} onChange ={this.handleChange} />
                        <br className = "log"></br>
                    <button className = 'submit' children = 'Lets go!' />
                    <br className = "log"></br>
                    <p style = {{color: "white", fontSize: "18px"}} >Don't have an account? <Link style = {{color: "#B2E4FF"}} className = 'login-button' to='./signup'> Sign Up Here!</Link></p>
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
    return null;
  }
}

export function getEmail(){
  var user = firebase.auth().currentUser;
  if(user !== null){
    var email = user.email;
    return email;
  }else{
    return 'example@example.ca';
  }
}

export function getCreated(){
  var user = firebase.auth().currentUser;
  if(user !== null){
    var date = "User since " + user.metadata.creationTime.slice(4,16);
    return date;
  }else{
    return 'today';
  }
}

export function getStatus(){
  var user = firebase.auth().currentUser;
  if(user !== null){
    var status = "I love books!";
    return status;
  }else{
    return 'Example Status';
  }
}

export function getUID(){
  var user = firebase.auth().currentUser;
  if(user !== null){
    return user.uid;
  }else{
    return ".";
  }
}


export function getName(){
 const db = firebase.firestore();
 var user = firebase.auth().currentUser;
 var name = '';
 db.collection("Users")
  .get()
  .then(querySnapshot => {
    const data = querySnapshot.docs.map(doc => doc.data());
    if(user !== null){
      for(var i in data){
        if(user.displayName === data[i].name){
          name = data[i].fullname;
          return name;
        }
      }
    }
  });
  return name;
}
