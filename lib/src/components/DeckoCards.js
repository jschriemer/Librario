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


const BASE_URL = `https://www.googleapis.com/books/v1/volumes`;
const db = firebase.firestore();


export default class DeckoCards extends React.Component{
  constructor() {
    super();
    this.state = {
      value: '',
      flag: 0,
      books : [],
      volumeInfo: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
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
        volumeInfo: result.data.items.volumeInfo
       })
  }

  addBook = (name, author, image, description) => {
    var docRef = db.
    collection("Library")
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

    render(){
      if(this.state.flag === 0 ){
        return(
        <div className = 'searchBar'>
        <br></br>
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
          <br></br>
          <p>.</p>
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
          <CardColumns className = 'post' style={{display: 'flex', flexDirection: 'row', width: '70rem'}}>
            <Card className = 'imgCard' key={books.uniqueId}>
              <Card.Img variant="top" src={bookimagecheck(index,this.state.books)} style={{width : '100px'}} />
            </Card>
            <Card>
              <Card.Body>
              <Card.Title>
                {this.state.books.items[index].volumeInfo.title} {this.state.books.items[index].volumeInfo.author}
              </Card.Title>
              <Card.Text>
                {descriptioncheck(index, this.state.books)}
              </Card.Text>
              <Button className = "likebtn" variant="secondary" onClick = { () =>
                this.addBook(
                  this.state.books.items[index].volumeInfo.title,
                  authorCheck(index, this.state.books),
                  bookimagecheck(index,this.state.books),
                  descriptioncheck(index, this.state.books)
                )
              } size="sm">Shelf</Button>
            </Card.Body>
          </Card>
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
    console.log("undefined image! @ " + books.items[index]);
    return 'https://farm8.staticflickr.com/7841/46348541334_ce133cc6f0_o.jpg';
  }else{
    return books.items[index].volumeInfo.imageLinks.thumbnail;
  }
}

function descriptioncheck(index, books){
  var descript = books.items[index].volumeInfo.description
  var length = 135;
  if(descript !== undefined){
    if(descript.length >= length){
      descript = descript.substring(0, length - 3) + "..."
      return descript;
    }else{
      return descript;
  }
}else{
  return "no description available";
}
}

function authorCheck(index, books){
  if(books.items[index].volumeInfo.author === undefined){
    return '';
  }else{
    return books.items[index].volumeInfo.author;
  }
}

function bookAdded(name, val) {
  console.log('bookadded')
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
