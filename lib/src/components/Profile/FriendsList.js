import React from 'react';
import Avatar from 'react-avatar';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import * as bs from 'bootstrap/dist/css/bootstrap.css';
import './Profile.css';
import Form from 'react-bootstrap/Form';
import Fade from 'react-reveal/Fade';
import firebase from '../../firebase';
import CardColumns from 'react-bootstrap/CardColumns';
import * as login from '../Auth/Login.js';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const db = firebase.firestore();
var userList = [];

export default class Friends extends React.Component{
  constructor() {
    super();
    this.state = {
      data: [],
      friendUid: ""
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
        <div className = 'library'>
          <CardDeck>
          <ul>
      {this.state.data.map((data, index) => {
       return(
         <div>
          <Avatar className = "friendAva" name={data.fullname} round={true}/>
          <Card className = "friendlist" style = {{padding: '30px'}}>
          <Card.Title>
            {data.fullname}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {data.name}
          </Card.Subtitle>
          <p>
          <Link to={{
  pathname: '/friendslibrary',
  state: {
    friendUid: data.uid
  }
}} href="/friendslibrary">Library</Link>
          </p>
          </Card>
         </div>
  );})}
  </ul>
    </CardDeck>
    </div>
  );
  }
  }
