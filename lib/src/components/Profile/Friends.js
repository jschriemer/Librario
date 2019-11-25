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
    this.setState({
          flag: 1,
          usersList : userList
         })
    console.log('A name was submitted: ' + this.state.value);
    const items = '';
    event.preventDefault();
    let value = this.state.value;
    userList = [];
    db.collection("Users")
    .get()
    .then(querySnapshot => {
   const data = querySnapshot.docs.map(doc => doc.data());
     for(var i in data){
       console.log("returning: " + data[i].name)
       userList.push(data[i]);
       console.log()
   if(data[i].fullname === value || data[i].name === value){
     console.log("yuh" + data[i].fullname + " " + data[i].name + " " + value);
     userList.push(data[i]);
     console.log(userList)
   }
  }
  });
  this.setState({
        flag: 1,
        usersList : userList
       })
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
        console.log(this.state.usersList)
        return(
        <div style = {{height: '100vh'}} className = 'FriendsPage'>
        <Fade>
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
          </Fade>
          <ul>
          <p>AAA {userList}</p>
          <p>BBB {this.state.usersList.name}</p>
          </ul>
            <ul>
        {this.state.usersList.map((users, index) => {
          console.log(users + users.name + users[index].name)
          return(
        <div className = 'body'>
        <p>THIS Is IT</p>
          <CardColumns className = 'deck' style={{display: 'flex', flexDirection: 'row', width: '50rem'}}>
          <Fade>
            <Card className = 'imgCarddeck' key={users.uniqueId}>
              <Avatar className = "ava" name={users.fullname} round={true}/>
            </Card>
            <Card>
              <Card.Body>
              <Card.Title>
                - {this.state.userList[index].fullname} -
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted" style = {{color: "white"}}>
              - {this.state.userList[index].name} -
              </Card.Subtitle>
              <Card.Text>
                Hello!
              </Card.Text>
            </Card.Body>
          </Card>
          </Fade>
        </CardColumns>
      </div>
    )})}
    </ul>
    </div>
  );
      }
    }
}
