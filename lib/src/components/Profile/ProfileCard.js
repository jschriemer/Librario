import React from 'react';
import Avatar from 'react-avatar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import * as bs from 'bootstrap/dist/css/bootstrap.css';
import './Profile.css';
import * as login from '../Auth/Login.js';

export default class ProfileCard extends React.Component{
    render(){
        return(
             <Card className = "cardo" style={{ width: '30rem', height: '35rem'}}>
                <Avatar className = "ava" name={login.getUser()} round={true}/>
                    <Card.Body>
                    <Card.Title className = "cardoTitle">{login.getUser()}</Card.Title>
                    <Card.Subtitle className = "cardoSubtitle">{login.getUser()}</Card.Subtitle>
                    <br></br>
                    <ListGroup variant="flush">
                    <ListGroup.Item>{login.getStatus()}</ListGroup.Item>
                    <ListGroup.Item>{login.getEmail()}</ListGroup.Item>
                    <ListGroup.Item>{login.getCreated()}</ListGroup.Item>
                    </ListGroup>
                    <br></br>
                    </Card.Body>
            </Card>
        )
    }
}
