import React from 'react';
import Avatar from 'react-avatar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import * as bs from 'bootstrap/dist/css/bootstrap.css';
import './Profile.css';
import Form from 'react-bootstrap/Form';
import Fade from 'react-reveal/Fade';
import firebase from '../../firebase';
import CardColumns from 'react-bootstrap/CardColumns';
import * as login from '../Auth/Login.js';

const db = firebase.firestore();
var userList = [];

export default class Friends extends React.Component{
  constructor() {
    super();
    this.state = {
      data: []
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
          <CardColumns className = 'post'>
          <ul>
      {this.state.data.map((data, index) => {
       return(
         <div>
          <Avatar className = "friendAva" name={data.fullname} round={true}/>
          <Card className = "searchFriend" style = {{padding: '10px'}}>
          <Card.Title>
            {data.fullname}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {data.name}
          </Card.Subtitle>
          </Card>
         </div>
  );})}
  </ul>
    </CardColumns>
    </div>
  );
  }
  }
