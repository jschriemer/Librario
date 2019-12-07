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
import { useToasts, ToastProvider } from 'react-toast-notifications'

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
      if (querySnapshot.empty) {
      console.log('No matching documents.');
      return;
    }
   const data = querySnapshot.docs.map(doc => doc.data());
   console.log(data )
     for(var i in data){
   if(value === data[i].name ||  value === data[i].fullname || value === data[i].fullname.toLowerCase() || value === data[i].name.toLowerCase()){
     userList.push(data[i]);
     name = data[i].fullname;
     this.setState({
       flag: 1,
       usersList: userList
     })
   }
 }
});
  }
addFriend = (fullname, name, uid) => {
  var addFriend =
    db.collection('Users').doc(login.getUID())
    .collection('Friends')
    .doc(fullname)
    .set({
      fullname: fullname,
      username: name,
      uid: uid
    })
  .then(function() {
    console.log("Friend Added!");
  })
  .catch(function(error) {
    console.error("Error adding friend document: ", error);
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
          <div style = {{minHeight: '100vh'}} className = 'FriendsPage'>
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
          <br></br>
          </div>
          <p>.</p>
          <ul>
        {this.state.usersList.map((item, key) => {
          let uid = db.collection('Users').doc();
          console.log(login.getUID())

          db.collection("Users").doc(login.getUID()).collection('Library')
          .get()
          .then(querySnapshot => {
              const data = querySnapshot.docs.map(doc => doc.data());
              console.log(data);
        }
      );
        return(
          <div>
           <Avatar className = "friendAva" name={item.fullname} round={true}/>
           <Card className = "searchFriend" style = {{padding: '10px'}}>
           <Card.Title>
             {item.fullname}
           </Card.Title>
           <Card.Subtitle className="mb-2 text-muted">
             {item.name}
           </Card.Subtitle>
           <ToastProvider>
             <ToastDemo
             fullname = { item.fullname}
             name = {item.name}
             uid = {item.uid}
             content = "Friend Added!"
             />
           </ToastProvider>
           </Card>
          </div>
      )})}
      </ul>
      </div>
    );
    }
    }
  }

export const ToastDemo = ({ content, fullname, name, uid }) => {
    const { addToast } = useToasts()
    return (
      <Button className = "friendbtn" onClick={() => {addToast(content, {
        appearance: 'success',
        autoDismiss: true,
      });
      addFriend(
        fullname,
        name,
        uid
      );
    }
    }>
        Add Friend
      </Button>
    )
  }

function addFriend(fullname, name, uid){
    var addFriend =
      db.collection('Users').doc(login.getUID())
      .collection('Friends')
      .doc(fullname)
      .set({
        fullname: fullname,
        username: name,
        uid: uid
      })
    .then(function() {
      console.log("Friend Added!");
    })
    .catch(function(error) {
      console.error("Error adding friend document: ", error);
    });
  }
