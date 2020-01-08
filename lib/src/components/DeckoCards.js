import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import '../stylesheets/DeckoCards.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import axios from "axios";
import firebase from '../firebase'
import * as login from './Auth/Login.js';
import * as ps from './Profile/ProfileSettings.js';
import { useToasts, ToastProvider } from 'react-toast-notifications'
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
      descriptio: 'first',
      show: false
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
      const content = "Book Added! Find it in your library"
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
              <ToastProvider>
                <ToastDemo
                title = {this.state.books.items[index].volumeInfo.title}
                author = {authorCheck(index, this.state.books)}
                coverurl = {bookimagecheck(index,this.state.books)}
                description = {this.descriptioncheck(index, this.state.books, 'data')}
                content = "Book Added! find it in your Library"
                />
              </ToastProvider>
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
              <ToastProvider>
                <ToastDemo
                title = {this.state.books.items[index].volumeInfo.title}
                author = {authorCheck(index, this.state.books)}
                coverurl = {bookimagecheck(index,this.state.books)}
                description = {this.descriptioncheck(index, this.state.books, 'data')}
                content = "Book Added! find it in your Library"
                />
              </ToastProvider>
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

export const ToastDemo = ({ content, title, author, coverurl, description }) => {
  const { addToast } = useToasts()
  return (
    <Button onClick={() => {addToast(content, {
      appearance: 'success',
      autoDismiss: true,
    });
    addBook(
      title,
      author,
      coverurl,
      description
    );
  }

  }>
      Shelf Book
    </Button>
  )
}

function addBook(name, author, image, description){
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
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  });
}
