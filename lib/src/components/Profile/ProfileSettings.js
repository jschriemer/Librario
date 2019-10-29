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

//<CardColumns style={{display: 'flex', flexDirection: 'row', width: '70rem'}}>
export default class ProfileSettings extends React.Component{

    render(){
        const length = window.location.href.length;
        const current = window.location.href.slice(30, length);
        return(
        <Card className = "cardosettings" style={{ width: '60rem', height: '35rem'}}>
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
              {navClicked(current)}
            </ListGroup>
          </Card>
        )
    }
}

function navClicked(name) {
    if(name === "profile"){
        return(<p>profile</p>)
    }else if(name === "settings"){
        return(<p>settings</p>)
    }else if(name === "signout"){
      return(
      <button type="button" onClick={logOutUser()}>
        Sign Out
      </button>
    )
    }
}

function logOutUser(){
  var tempname = login.getUser();
firebase
.auth()
.signOut()
.then(function() {
  alert("Goodbye " + tempname + "!");
  this.props.history.push('/login');
})
.catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  alert(errorMessage);
});
}
