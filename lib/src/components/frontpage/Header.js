import React from 'react'
import Popup from "reactjs-popup";
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Avatar from 'react-avatar';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import FaBell from "react-icons/fa";
import IconContext from "react-icons";
import { BrowserRouter as Router, Route, Link, Switch, useHistory, withRouter } from 'react-router-dom';
import * as login from '../Auth/Login.js';
import * as ps from '../Profile/ProfileSettings.js';
import * as register from '../Auth/Register.js';
import firebase, {auth, provider} from '../../firebase.js'
import '../../stylesheets/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import history from '../../history';
import PropTypes from "prop-types";

const green = 'teal';
const gold = '#FFC300';
const black = 'black';
const purple = '#DEB9FF';
const db = firebase.firestore();

export default class Header extends React.Component{
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  constructor(props){
    super(props);
    this.state = {
      color: black,
      user: false,
      page: 'front',
      image: "",
    };
    this.changeColor = this.changeColor.bind(this);

  }

  usercheck(){
    if(!ps.isloggedOut()){
      if(this.state.user === false)
        this.setState({user: true});
      return true
    }
    return false
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
        console.log("componentDidMount")
        auth.onAuthStateChanged(user => {
        if(user){
            this.setState({user: true});
            }
        });
    }

  changeColor(){
    const newColor = this.state.color == green ? gold : green;
    this.setState({color: newColor});
  }

  changePage(){
    const length = window.location.href.length;
    const current = window.location.href.slice(21, length);
    console.log(current)
    if(current === '/'){
      this.setState({
        page: "front",
        color: black
      })
    }else{
      this.setState({
        page: 'back',
        color: purple
      })
    }
  }

  loggedOutUser = (e) => {
  var tempname = login.getUser();
  firebase
  .auth()
  .signOut()
  .then(() => {
    alert("Goodbye " + tempname + "!");
    history.push('/');
    window.location.reload();
  })
  .catch(function(error) {
    alert(error.message);
  });
}

  avatargen(){
    return(  <Avatar size="35" name={login.getUser()} round={true}/>);
  }

    render(){
    const { match, location, history } = this.props

    //const headerColor = location.pathname === '/' ? { background: 'white'} : { background: 'blue' }
    //console.log("HERE is is:::::::::::: " + location.pathname)

      if(this.state.user &&  this.usercheck()){
        console.log("header image state: " + this.state.image)
        if(this.state.image === "" || this.state.image === undefined){

        return(
          <nav className="navbar navbar-expand" style ={{background: black}}>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link to='/' onClick={() => this.changePage()} className="nav-link" href="#"> <img src={ require('../../images/book.png') } style ={{width: '30px'}}/> <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                  <Link to= '/search' onClick={() => this.changePage()} className="nav-link" href="/search">Search</Link>
                </li>
                <li className="nav-item">
                <Dropdown drop='left' style = {{float: 'right', position: 'absolute', right: "30px", color: "white"}}>
                <Dropdown.Toggle style = {{color: "black", backgroundColor: "black", border:"none"}}>
                  {this.avatargen()}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item><Link style = {{color:"black"}} to= '/profile' className="nav-link" href="/profile">Profile</Link> </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item><button className="btn btn-danger" style = {{marginTop: "0px" }} onClick={this.loggedOutUser.bind(this)} history={this.props.history}>
                     Sign Out
                     </button></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                </li>
                <li className="nav-item">
                  <Link to='/friendslist' onClick={() => this.changePage()} className="nav-link" href="/friends">Friends</Link>
                </li>
                <li className="nav-item">
                  <Link to='/library' onClick={() => this.changePage()} className="nav-link" href="/library">Library</Link>
                </li>
              </ul>
              {/*}<button className = 'themebtn' onClick = {this.changeColor} style = {{float: 'right'}}> </button>*/}
              {/*<Dropdown style = {{float: 'right', position: 'absolute', right: '90px', color: "white"}}>
              <Dropdown.Toggle id="dropdown-basic" style = {{color: "white"}}>
              <IconContext.Provider value={{ color: "white"}}>
                <div>
                   <FaBell />
                </div>
                </IconContext.Provider>
              </Dropdown.Toggle>
  <Dropdown.Menu className = "notifcation">
  <div class="dropdown-menu">
  <p class="dropdown-item">Apples wants to be your friend!</p>
  <p class="dropdown-item">Oranges wants to be your friend!</p>
</div>
  </Dropdown.Menu>
</Dropdown>*/}
            </div>
          </nav>
        );

      }else{
        return(
          <nav className="navbar navbar-expand" style ={{background: 'black'}}>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link to='/' className="nav-link" href="#"> <img src={ require('../../images/book.png') } style ={{width: '30px'}}/> <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                  <Link to= '/search' className="nav-link" href="/search">Search</Link>
                </li>
                <li className="nav-item">
                <Dropdown drop='left' style = {{float: 'right', position: 'absolute', right: "30px", color: "white"}}>
                <Dropdown.Toggle style = {{color: "black", backgroundColor: "black", border:"none"}}>
                  <Avatar size="35" src={this.state.image} round={true}/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item><Link style = {{color:"black"}} to= '/profile' className="nav-link" href="/profile">Profile</Link> </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item><button className="btn btn-danger" style = {{marginTop: "0px" }} onClick={this.loggedOutUser.bind(this)} history={this.props.history}>
                     Sign Out
                     </button></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                </li>
                <li className="nav-item">
                  <Link to='/friendslist' className="nav-link" href="/friends">Friends</Link>
                </li>
                <li className="nav-item">
                  <Link to='/library' className="nav-link" href="/library">Library</Link>
                </li>
              </ul>
            </div>
          </nav>
        );
      }
    }
        return(
          <nav className="navbar navbar-expand-lg" style = {{background: 'black'}} /*style ={{background: this.state.color}}*/>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link to='/' className="nav-link" href="#"> <img src={ require('../../images/book.png') } style ={{width: '30px'}}/> <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                  <Link to='/login' className="nav-link" href="/login">Login</Link>
                </li>
              </ul>
                {/*}<button className = 'themebtn' onClick = {this.changeColor} style = {{float: 'right'}}> </button>*/}
            </div>
          </nav>
        );
    }
}
