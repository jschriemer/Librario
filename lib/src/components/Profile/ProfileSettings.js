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
  })
  .catch(function(error) {
    alert(error.message);
  });
}

  navClicked(name) {
     if(name === "profile"){
         return(<p>profile</p>)
     }else if(name === "settings"){
         return(<p>settings</p>)
     }else if(name === "signout"){
       return(
         <div>
         <p>signout</p>
       <button className="btn btn-info" onClick={this.logOutUser()}>
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
