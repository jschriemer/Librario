import React from 'react';
import Avatar from 'react-avatar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import * as bs from 'bootstrap/dist/css/bootstrap.css';
import Nav from 'react-bootstrap/Nav';
import './Profile.css';
import firebase, {auth, provider} from '../../firebase.js'
import * as login from '../Auth/Login';
import { useHistory } from "react-router-dom";
import { Route , withRouter} from 'react-router-dom';

//<CardColumns style={{display: 'flex', flexDirection: 'row', width: '70rem'}}>
class ProfileSettings extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: false
    };
  }

  logOutUser = () => {
  var tempname = login.getUser();
  firebase
  .auth()
  .signOut()
  .then(() => {
    alert("Goodbye " + tempname + "!");
    this.props.history.push('/');
    window.location.reload();
  })
  .catch(function(error) {
    alert(error.message);
  });
}


  changePassword = (currentPassword, newPassword) => {
  this.reauthenticate(currentPassword).then(() => {
    var user = login.getUser();
    user.updatePassword(newPassword).then(() => {
      console.log("Password updated!");
    }).catch((error) => { console.log(error); });
  }).catch((error) => { console.log(error); });
}

  reauthenticate = (currentPassword) => {
  var user = firebase.auth().currentUser;
  var cred = firebase.auth.EmailAuthProvider.credential(
      user.email, currentPassword);
  return user.reauthenticateWithCredential(cred);
}

  navClicked(name) {
     if(name === "" || name === "profile"){
         return(<div>
           <p> Profile Info </p>
          <ListGroup.Item>{login.getUser()}</ListGroup.Item>
          <ListGroup.Item>{login.getName()}</ListGroup.Item>
          <ListGroup.Item>{login.getEmail()}</ListGroup.Item>
          <ListGroup.Item>{login.getCreated()}</ListGroup.Item>
         </div>
       )
     }else if(name === "settings"){
         return(
           <div>
           <p>Settings</p>
           <ListGroup.Item> Change Password button onclick(changePassword) </ListGroup.Item>
           <ListGroup.Item> Change username button onclick(changePassword) </ListGroup.Item>
           </div>
         )
     }else if(name === "signout"){
       return(
         <div>
         <p>signout</p>
         <button className="btn btn-info" onClick={() => this.logOutUser()}>
          Sign Outed
          </button>
       </div>
     )
     }
 }


    render(){
        const length = window.location.href.length;
        const current = window.location.href.slice(30, length);
        return(
        <Card className = "cardosettings" style={{ width: '60rem', height: '30rem'}}>
          <Card.Header className = 'header0'>
            <Nav variant="tabs" defaultActiveKey="#profile">
                <Nav.Item >
                    <Nav.Link className = 'linka' href="#profile">Edit Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className = 'linka' href="#settings">Account Settings</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className = 'linka' href="#signout">Sign Out</Nav.Link>
                </Nav.Item>
            </Nav>
        </Card.Header>
            <ListGroup variant="flush">
              {this.navClicked(current)}
            </ListGroup>
          </Card>
        )
    }
}

export function isloggedOut(){
  console.log("lg " + login.getUser())
  if(login.getUser() !== null){
    return false
  }
    return true
}

export default withRouter(ProfileSettings);
