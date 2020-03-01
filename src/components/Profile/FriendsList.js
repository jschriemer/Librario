import React from 'react';
import Avatar from 'react-avatar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './Profile.css';
import firebase from '../../firebase';
import * as login from '../Auth/Login.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

const db = firebase.firestore();
var userList = [];

export default class Friends extends React.Component{
  constructor() {
    super();
    this.state = {
      data: [],
      friendUid: "",
      friendName: "",
    };
  }

  componentDidMount() {
    userList = [];
    db.collection("Users")
    .doc(login.getUID()).collection("Friends")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        for(var i in data){
        userList.push(data[i]);
        this.setState({
          data:userList
         });
       }
      });
  }


  render(){
      return(
        <div className = 'friendsPage'>
        <br></br>
          <Card className = "friendlist" style = {{padding: '30px'}}>
          <Link to={{
      pathname: '/friends'
    }} href="/friends" style = {{fontSize: "1.5em", float: "right"}}>Add Friends</Link>
          <ul>
      {this.state.data.map((data, index) => {
        console.log("Name: " + data.fullname + " name: " + data.name + " uid " + data.uid)
       return(
         <div>
         <ListGroup variant="flush">
         <ListGroup.Item>
          <Avatar className = "friendAva" name={data.fullname} round={true} style = {{float: 'left'}}/>
          <Card.Body style = {{bottom: "10px"}}>
          <Card.Title>
            {data.fullname}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {data.username}
          </Card.Subtitle>
          <p>
          <Link to={{
  pathname: '/friendslibrary',
  state: {
    friendUid: data.uid,
    friendName: data.username
  },
  name:data.name
}} href="/friendslibrary"><img src={ require('../../images/friendsbook.jpg') } style ={{width: '30px'}}/> Library</Link>
          </p>
          </Card.Body>
          </ListGroup.Item>
          </ListGroup>
         </div>
  );})}
  </ul>
  </Card>
<br></br>
    </div>
  );
  }
  }
