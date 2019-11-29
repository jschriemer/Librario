import React from 'react';
import firebase from '../../firebase.js'
import { Link } from 'react-router-dom';
import Login from './Login';
import './Auth.css';
import Fade from 'react-reveal/Fade';


const BASE_URL = `https://www.googleapis.com/books/v1/volumes`;
const db = firebase.firestore();


export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            fullname: '',
            uid: ''
        }
    }

    handleChange = event => {
		this.setState({[event.target.name]: event.target.value});
	}

    //Submit email and password to firebase database
	handleSubmit = event => {
		event.preventDefault();
        const {email, username, password, fullname, uid} = this.state;
        firebase
          .auth()
	        .createUserWithEmailAndPassword(email, password)
	        .then(() => {
	            const user = firebase.auth().currentUser;
	            user
	              .updateProfile({displayName: username, providerId: fullname})
		            .then(() => {
		                this.props.history.push('/Login');
		            });

                var docRef = db.
                collection("Users")
                .doc(user.uid)
                .set({
                  name: username,
                  fullname: fullname,
                  email: email,
                  uid: user.uid,
                })
                .then(function() {
                  console.log("Document successfully written!");
                })
                .catch(function(error) {
                  console.error("Error writing document: ", error);
                });


            })
            .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
          })
	}


    render(){
        const {email,username, password, fullname} = this.state;
        return(
            <div className = 'authcontainer2'>
                <h1> Registration </h1>
                <br className = "log"></br>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor = 'username'></label>
                        <input className = 'inputBox' type = 'text'  placeholder = 'Username'  name = 'username' id ='username' value = {username} onChange = {this.handleChange} />
                        <br className = "log"></br>
                        <label htmlFor = 'fullname'></label>
                            <input className = 'inputBox' type = 'text'  placeholder = 'Full Name'  name = 'fullname' id ='fullname' value = {fullname} onChange = {this.handleChange} />
                            <br className = "log"></br>
                    <label htmlFor = 'email'></label>
                        <input className = 'inputBox' type = 'email'  placeholder = 'Email'  name ='email' id = 'email' value = {email} onChange = {this.handleChange} />
                        <br className = "log"></br>
                    <label htmlFor = 'password'></label>
                        <input className = 'inputBox' type = 'password' placeholder = 'Password' name = 'password' id = 'password' value = {password} onChange ={this.handleChange} />
                        <br className = "log"></br>
                    <button className = 'submit' children = 'Lets go!' />
                    <br className = "log"></br>
                    <p>Have an account? <Link className = 'login-button' to='./login'> Login here! </Link></p>
                </form>
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
