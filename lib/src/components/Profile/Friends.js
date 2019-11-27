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
      value: '',
      flag: 0,
      books : [],
      volumeInfo: [],
      user: false,
      descriptio: 'first',
      usersList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit = async (event) =>  {
    console.log('A name was submitted: ' + this.state.value);
    event.preventDefault();
    let value = this.state.value;
    userList = [];
    var name = '';
    db.collection("Users")
    .get()
    .then(querySnapshot => {
   const data = querySnapshot.docs.map(doc => doc.data());
   console.log(data )
     for(var i in data){
   if(value === data[i].name ||  value === data[i].fullname){
     console.log("yuhpidoo" + data[i].fullname);
     userList.push(data[i]);
     name = data[i].fullname;
     this.setState({
       flag: 1,
     })
   }
 }
});
  }

    render(){
      if(this.state.flag === 0 ){
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
      }else{
        console.log(userList)
        return(
        <div style = {{height: '100vh'}} className = 'FriendsPage'>
        <div className = 'friendSearchBar'>
        <Form inline onSubmit={this.handleSubmit}>
          <Form.Control
            className= "friendSearch" size="lg" type="text"
            placeholder="Search for amnother friend!"
            value={this.state.value} onChange={this.handleChange}
            />
            <Button className = "submitbtn" variant="secondary" type="submit" size="lg">
            Search
            </Button>
          </Form>
          <br className = 'brdeck'></br>
          <p>.</p>
          </div>
          <p>AAA {userList[0].email}</p>
          <p>BBB {userList[0].name}</p>
        </div>
      );
      }
    }
  }
