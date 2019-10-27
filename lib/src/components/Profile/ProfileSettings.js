import React from 'react';
import Avatar from 'react-avatar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import * as bs from 'bootstrap/dist/css/bootstrap.css';
import Nav from 'react-bootstrap/Nav';
import './Profile.css';

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
                    <Nav.Link className = 'linka' href="#help">Help</Nav.Link>
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
    }else if(name === "help"){
        return(<p>help</p>)
    }
};
