import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import './Profile.css';
import firebase, {auth, provider} from '../../firebase.js'
import * as login from '../Auth/Login';
import {withRouter} from 'react-router-dom';

const db = firebase.firestore();

class ProfileSettings extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: false,
      fullnamed: this.getName2()
    };
  }


    handleNewImage = e => {
      console.log(e + e.target.value)
      this.setState({ image: e.target.value })
      var addPic =
        db.collection('Users').doc(login.getUID())
        .collection('Photos')
        .doc('Avatar')
        .set({
          ava: e.target.value
        })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    }

    handleScale = e => {
      const scale = parseFloat(e.target.value)
      this.setState({ scale })
    }

    handlePositionChange = position => {
      this.setState({ position })
    }

  logOutUser = () => {
  var tempname = login.getUser();
  firebase
  .auth()
  .signOut()
  .then(() => {
    alert("Goodbye " + tempname + "!");
    this.props.history.push('/');
    window.location.reload();
  })
  .catch(function(error) {
    alert(error.message);
  });
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
  console.log("yuh" + data[i].fullname);
  name = data[i].fullname;
  this.setState({
    fullnamed: name
  });
  return name;
}
}
}
});
return name;
}


  changePassword = (currentPassword, newPassword) => {
  this.reauthenticate(currentPassword).then(() => {
    var user = login.getUser();
    user.updatePassword(newPassword).then(() => {
      console.log("Password updated!");
    }).catch((error) => { console.log(error); });
  }).catch((error) => { console.log(error); });
}

  reauthenticate = (currentPassword) => {
  var user = firebase.auth().currentUser;
  var cred = firebase.auth.EmailAuthProvider.credential(
      user.email, currentPassword);
  return user.reauthenticateWithCredential(cred);
}

changeUsername = (newName) => {
  const db = firebase.firestore();
  var user = firebase.auth().currentUser;
  var name = '';
  db.collection("Users")
  .doc(login.getUID())
  .update({name: newName});
  console.log("updated?")
}

  navClicked(name) {
     if(name === "" || name === "profile"){
         return(<div>
           <h4 style = {{marginTop: "20px" }}> Profile Info </h4>
        <ListGroup.Item><p style={{ fontWeight: 'bold' }}>Username</p>
        {login.getUser()}</ListGroup.Item>
      <ListGroup.Item><p style={{ fontWeight: 'bold' }}>Full Name</p>{this.state.fullnamed}</ListGroup.Item>
        <ListGroup.Item><p style={{ fontWeight: 'bold' }}>Email</p>{login.getEmail()}</ListGroup.Item>
        <ListGroup.Item><p style={{ fontWeight: 'bold' }}>Account Created</p>{login.getCreated()}</ListGroup.Item>
        <ListGroup.Item> New Avatar Image URL  <input name="newImage" placeholder="https://example.com" type="url" onChange={this.handleNewImage} /></ListGroup.Item>
         </div>
       )
     }else if(name === "settings"){
         return(
           <div>
           <h4 style = {{marginTop: "20px" }}>Settings</h4>
           <ListGroup.Item><p> Password: *********   </p> <button className="btn btn-info" onClick={() => this.changePassword()}>
            Change Password
            </button></ListGroup.Item>
           <ListGroup.Item><p> Username: {login.getUser()}    </p>
           <form>
  <label>
    Name:
    <input type="text" name="name" value={this.state.value}/>
  </label>
  <input type="submit" value="Submit" onClick={() => this.changeUsername(this.state.value)}/>
</form>
           <button className="btn btn-info" onClick={() => this.changeUsername(this.state.value)}>
            Change Username
            </button> </ListGroup.Item>
           </div>
         )
     }else if(name === "signout"){
       return(
         <div>
         <h4 style = {{marginTop: "20px" }}>Sign Out</h4>

         <button className="btn btn-danger" style = {{marginTop: "60px" }}onClick={() => this.logOutUser()}>
          Sign Out
          </button>
       </div>
     )
     }
 }


    render(){
        const length = window.location.href.length;
        const current = window.location.href.slice(30, length);
        if(this.state.fullnamed === ''){
          console.log("checking")
          var nae = this.getName2();
        }
        return(
        <Card className = "cardosettings" style={{ width: '60rem', height: '30rem'}}>
          <Card.Header className = 'header0'>
            <Nav variant="tabs" defaultActiveKey="#profile">
                <Nav.Item >
                    <Nav.Link className = 'linka' href="#profile">Edit Profile</Nav.Link>
                </Nav.Item>
                {/*<Nav.Item>
                    <Nav.Link className = 'linka' href="#settings">Account Settings</Nav.Link>
                </Nav.Item>*/}
                <Nav.Item>
                    <Nav.Link className = 'linka' href="#signout">Sign Out</Nav.Link>
                </Nav.Item>
            </Nav>
        </Card.Header>
            <ListGroup variant="flush">
              {this.navClicked(current)}
            </ListGroup>
          </Card>
        )
    }
}

export function isloggedOut(){
  console.log("lg " + login.getUser())
  if(login.getUser() !== null){
    return false
  }
    return true
}

export function loggedOutUser(){
var tempname = login.getUser();
firebase
.auth()
.signOut()
.then(() => {
  alert("Goodbye " + tempname + "!");
})
.catch(function(error) {
  alert(error.message);
});
}

export default withRouter(ProfileSettings);
