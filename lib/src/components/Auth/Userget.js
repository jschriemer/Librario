import React from 'react';
import firebase from '../../firebase.js'
import * as login from './Login.js'


export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: login.getUser()
        }
    }

    render(){
        return(
          <p> {this.state.username}
          </p>
        )
    }
}
