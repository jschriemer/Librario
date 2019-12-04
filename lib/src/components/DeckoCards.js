import React, { useState } from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import '../stylesheets/DeckoCards.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from "axios";
import firebase from '../firebase'
import * as login from './Auth/Login.js';
import * as ps from './Profile/ProfileSettings.js';

import Fade from 'react-reveal/Fade';


const BASE_URL = `https://www.googleapis.com/books/v1/volumes`;
const db = firebase.firestore();


export default class DeckoCards extends React.Component{
  constructor() {
    super();
    this.state = {
      value: '',
      flag: 0,
      books : [],
      volumeInfo: [],
      user: false,
      descriptio: 'first'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  usercheck(){
    if(!ps.isloggedOut()){
      if(this.state.user === false)
        this.setState({user: true});
      return true
    }
    return false
  }


  handleSubmit = async (event) =>  {
    console.log('A name was submitted: ' + this.state.value);
    const items = '';
    event.preventDefault();
    let value = this.state.value;
    const result = await axios.get(`${BASE_URL}?q=${value}`);
      console.log(result.data);
      this.setState({
        flag: 1,
        books : result.data,
        volumeInfo: result.data.items.volumeInfo,
        show: false
       })
  }

  addBook = (name, author, image, description) => {
  /*  var docRef = db.
    collection("Library")
    .doc(name)
    .set({
      title: name,
      author: author,
      description: description,
      coverurl: image
    })*/
    var addBook =
      db.collection('Users').doc(login.getUID())
      .collection('Library')
      .doc(name)
      .set({
        title: name,
        author: author,
        description: description,
        coverurl: image
      })
    .then(function() {
      console.log("Document successfully written!");
      bookAdded(name,true)
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }

  descriptioncheck = (index, books, flag) => {
    var descript = books.items[index].volumeInfo.description
    var length = 135;
    if(descript !== undefined){
      if(flag !== 'data'){
      if(descript.length >= length){
        descript = descript.substring(0, length - 3) + "..."
        //showmore button should go here
        return (
        <div>
          {descript}
        </div>
        );
      }else{
        return descript;
      }
    }else if(flag === 'showmore'){
      //Showless feature should go here
      return (
      <div>
        {descript}
      </div>
      );
    }else{
      return descript;
    }
  }else{
    return "no description available";
  }
  }

    render(){
      if(this.state.flag === 0 ){
        return(
        <Fade>
        <div className = 'searchBar'>
        <br className = 'brdeck'></br>
        <h1 style = {{marginBottom: "20px"}}> Librario </h1>
        <Form inline onSubmit={this.handleSubmit}>
          <Form.Control
            className= "booksearch" size="lg" type="text"
            placeholder="Search by Book or Author"
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
        );
      }else if(this.state.user &&  this.usercheck()){
        return(
          <div className = 'searchresults'>
            <Form inline onSubmit={this.handleSubmit}>
              <br className = 'searched'></br>
              <Form.Control
                className= "booksearch" size="lg" type="text"
                placeholder="Search by Book or Author"
                value={this.state.value} onChange={this.handleChange}
              />
              <Button className = "submitbtn" variant="secondary" type="submit" size="lg">
                Submit
              </Button>
            </Form>
            <ul>
        {this.state.books.items.map((books, index) => {
          const [show, setShow] = useState(false);
          return(
        <div className = 'body'>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
          <CardColumns className = 'deck' style={{display: 'flex', flexDirection: 'row', width: '50rem'}}>
          <Fade>
            <Card className = 'imgCarddeck' key={books.uniqueId}>
              <Card.Img variant="top" src={bookimagecheck(index,this.state.books)} style={{width : '100px'}} />
            </Card>
            <Card>
              <Card.Body>
              <Card.Title>
                {this.state.books.items[index].volumeInfo.title}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {authorCheck(index, this.state.books)}
              </Card.Subtitle>
              <Card.Text>
                {this.descriptioncheck(index, this.state.books, false)}
              </Card.Text>
              <Button className = "likebtn" variant="info" onClick = { () =>
                this.addBook(
                  this.state.books.items[index].volumeInfo.title,
                  authorCheck(index, this.state.books),
                  bookimagecheck(index,this.state.books),
                  this.descriptioncheck(index, this.state.books, true),
                  setShow(true)
                )
              } size="sm">Shelf</Button>
            </Card.Body>
          </Card>
          </Fade>
        </CardColumns>
      </div>
    )})}
    </ul>
    </div>
    );
  }else{
    return(
      <div className = 'searchresults'>
        <Form inline onSubmit={this.handleSubmit}>
          <br className = 'searched'></br>
          <Form.Control
            className= "booksearch" size="lg" type="text"
            placeholder="Search by Book or Author"
            value={this.state.value} onChange={this.handleChange}
          />
          <Button className = "submitbtn" variant="secondary" type="submit" size="lg">
            Submit
          </Button>
        </Form>
        <ul>
    {this.state.books.items.map((books, index) => {
      return(
    <div className = 'body'>
      <CardColumns className = 'deck' style={{display: 'flex', flexDirection: 'row', width: '50rem'}}>
      <Fade>
        <Card className = 'imgCarddeck' key={books.uniqueId}>
          <Card.Img variant="top" src={bookimagecheck(index,this.state.books)} style={{width : '100px'}} />
        </Card>
        <Card>
          <Card.Body>
          <Card.Title>
            {this.state.books.items[index].volumeInfo.title}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {authorCheck(index, this.state.books)}
          </Card.Subtitle>
          <Card.Text>
            {this.descriptioncheck(index, this.state.books, 'first')}
          </Card.Text>
          <Button className = "likebtn" variant="secondary" onClick = { () =>
                this.addBook(
                  this.state.books.items[index].volumeInfo.title,
                  authorCheck(index, this.state.books),
                  bookimagecheck(index,this.state.books),
                  this.descriptioncheck(index, this.state.books, 'data')
                )
              } size="sm">Shelf</Button>
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

function bookimagecheck(index, books){
  if(books.items[index].volumeInfo.imageLinks === undefined){
    return 'https://farm8.staticflickr.com/7841/46348541334_ce133cc6f0_o.jpg';
  }else{
    return books.items[index].volumeInfo.imageLinks.thumbnail;
  }
}


function authorCheck(index, books){
  if(books.items[index].volumeInfo.authors === undefined){
    return '';
  }else{
    var tempstring = ""
    var authlen = books.items[index].volumeInfo.authors.length;
    for(var i = 0; i < authlen; i++){
      if(authlen > 1){
        if(i === authlen-1){
          tempstring = tempstring + books.items[index].volumeInfo.authors[i]
        }else{
      tempstring = tempstring + books.items[index].volumeInfo.authors[i] + ", "
    }
    }else{
      tempstring = tempstring + books.items[index].volumeInfo.authors[i] + " "
    }
    }
    return tempstring;
  }
}

function bookAdded(name, val) {
  //eslint-disable-next-line react-hooks/rules-of-hooks
  const [show, setShow] = useState(val);

  return (
    <Row>
      <Col xs={6}>
        <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">{name} added to your library!</strong>
            <small>1s</small>
          </Toast.Header>
          <Toast.Body>Find your library </Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}
