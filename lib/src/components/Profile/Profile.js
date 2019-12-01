import React from 'react';
import Avatar from 'react-avatar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import * as bs from 'bootstrap/dist/css/bootstrap.css';
import './Profile.css';
import ProfileCard from './ProfileCard.js';
import ProfileSettings from './ProfileSettings.js'
import firebase from '../../firebase.js'

/*firebase.auth().onAuthStateChanged(user => {
  if(!user) {
    window.location = '/'; //If User is not logged in, redirect to login page
  }else{
  console.log("yes")
}
});*/

export default class Profile extends React.Component{
    render(){
        return(
             <div style = {{height: '100vh'}} className = 'profilePage'>
                 <ProfileCard />
                 <ProfileSettings />
             </div>
        )
    }
}
