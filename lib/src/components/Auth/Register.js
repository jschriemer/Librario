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
        const {email, username, password} = this.state;
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


    render(){
        const {email,username, password} = this.state;
        return(
            <div className = 'authcontainer2'>
                <h1> Registration </h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor = 'username'> Username </label>
                        <input type = 'text' name = 'username' id ='username' value = {username} onChange = {this.handleChange} />
                    <label htmlFor = 'email'> Email </label>
                        <input type = 'email' name ='email' id = 'email' value = {email} onChange = {this.handleChange} />
                    <label htmlFor = 'password'> Password </label>
                        <input type = 'password' name = 'password' id = 'password' value = {password} onChange ={this.handleChange} />
                    <button className = 'submit' children = 'Lets go!' />
                    <p>Have an account? <Link className = 'login-button' to='./login'> Login here! </Link></p>
                </form>
                </div>
        )
    }
}
