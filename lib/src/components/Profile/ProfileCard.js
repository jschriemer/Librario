import React from 'react';
import Avatar from 'react-avatar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import * as bs from 'bootstrap/dist/css/bootstrap.css';
import './Profile.css';

export default class ProfileCard extends React.Component{
    render(){
        return(
             <Card className = "cardo" style={{ width: '30rem', height: '35rem'}}>
                <div class="outerava">
                <Avatar className = "ava" name="Ad Da" round={true}/>
                </div>
                    <Card.Body>
                    <Card.Title>Username</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">John Doe</Card.Subtitle>
                    <br></br>
                    <ListGroup variant="flush">
                    <ListGroup.Item> user status</ListGroup.Item>
                    <ListGroup.Item>user email</ListGroup.Item>
                    <ListGroup.Item>date joined</ListGroup.Item>
                    </ListGroup>
                    <br></br>
                    <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
            </Card>
        )
    }
}