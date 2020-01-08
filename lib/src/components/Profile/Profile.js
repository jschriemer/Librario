import React from 'react';
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
