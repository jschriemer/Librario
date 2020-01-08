import React from 'react';
import Avatar from 'react-avatar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './Profile.css';
import * as login from '../Auth/Login.js';
import firebase from '../../firebase.js';

const db = firebase.firestore();


export default class ProfileCard extends React.Component{
  constructor() {
    super();
    this.state = {
      fullnamed: this.getName2(),
      name: "",
      image: "",
    };
  }

componentDidMount(){
  db.collection("Users")
  .doc(login.getUID()).collection("Photos")
  .get()
  .then(querySnapshot => {
  var data = querySnapshot.docs.map(doc => doc.data());
  this.setState({
    image: data[0].ava
  })
 });

  this.setState({
    fullnamed: this.getName2(),
    name: login.getUser()
  })
}


  getName2(){
   const db = firebase.firestore();
   var user = firebase.auth().currentUser;
   var name = '';
   db.collection("Users")
   .get()
   .then(querySnapshot => {
  const data = querySnapshot.docs.map(doc => doc.data());
  console.log(data )
  if(user !== null){
    console.log(data + " " + user.displayName + " " + data[1].name)
    for(var i in data){
  if(user.displayName === data[i].name){
    name = data[i].fullname;
    this.setState({
      fullnamed: name,
      image: data[i].avatar
    });
    return name;
  }
 }
 }
  });
  return name;
 }


    render(){
      console.log("BBBB" + this.state.image)

      if(this.state.fullnamed === ""){
        console.log("checking")
        var nae = this.getName2();
      }
      if(this.state.image === "" || this.state.image === undefined){
        return(
             <Card className = "cardo" style={{ width: '30rem', height: '30rem'}}>
                <Avatar className = "ava" name={login.getUser()} round={true}/>
                    <Card.Body>
                    <Card.Title style ={{fontWeight: 'bold' , marginTop: "15px"}}>{login.getUser()}</Card.Title>
                    <Card.Subtitle style ={{marginTop: "15px"}}>{this.state.fullnamed}</Card.Subtitle>
                    <br></br>
                    <ListGroup variant="flush">
                    <ListGroup.Item>{login.getEmail()}</ListGroup.Item>
                    <ListGroup.Item>{login.getCreated()}</ListGroup.Item>
                    </ListGroup>
                    <br></br>
                    </Card.Body>
            </Card>
        )
      }else{
        return(
             <Card className = "cardo" style={{ width: '30rem', height: '30rem'}}>
                  <Avatar className = "ava" src={this.state.image} round={true}/>
                    <Card.Body>
                    <Card.Title style ={{fontWeight: 'bold' , marginTop: "15px"}}>{login.getUser()}</Card.Title>
                    <Card.Subtitle style ={{marginTop: "15px"}}>{this.state.fullnamed}</Card.Subtitle>
                    <br></br>
                    <ListGroup variant="flush">
                    <ListGroup.Item>{login.getEmail()}</ListGroup.Item>
                    <ListGroup.Item>{login.getCreated()}</ListGroup.Item>
                    </ListGroup>
                    <br></br>
                    </Card.Body>
            </Card>
          );
      }
    }
}
