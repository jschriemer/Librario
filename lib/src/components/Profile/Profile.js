import React from 'react';
import Avatar from 'react-avatar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import * as bs from 'bootstrap/dist/css/bootstrap.css';
import './Profile.css';
import ProfileCard from './ProfileCard.js';
import ProfileSettings from './ProfileSettings.js'

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
