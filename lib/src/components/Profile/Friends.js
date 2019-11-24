import React from 'react';
import Avatar from 'react-avatar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import * as bs from 'bootstrap/dist/css/bootstrap.css';
import './Profile.css';
import Form from 'react-bootstrap/Form';
import Fade from 'react-reveal/Fade';


export default class Friends extends React.Component{
    render(){
        return(
             <div style = {{height: '100vh'}} className = 'FriendsPage'>
             <Fade>
             <div className = 'friendSearchBar'>
             <Form inline onSubmit={this.handleSubmit}>
               <Form.Control
                 className= "friendSearch" size="lg" type="text"
                 placeholder="Search for a friend!"
                 value={this.state.value} onChange={this.handleChange}
                 />
                 <Button className = "submitbtn" variant="secondary" type="submit" size="lg">
                 Search
                 </Button>
               </Form>
               <br className = 'brdeck'></br>
               <p>.</p>
               </div>
               </Fade>
             </div>
        )
    }
}
