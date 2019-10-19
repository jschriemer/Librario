import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import './DeckoCards.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import axios from "axios";

//todo n ot hard code image, title, and post
const BASE_URL = `https://www.googleapis.com/books/v1/volumes`;


export default class DeckoCards extends React.Component{
  constructor() {
    super();
    this.state = {//set initial state
      value: '',
      flag: 0,
      books : [],
      //description: '',
      //title: '',
      //author: '',
      //image: '',
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
    //fetchBooks();
    let value = this.state.value;
    const result = await axios.get(`${BASE_URL}?q=${value}`);
    fetch(BASE_URL, {method:"GET"})
    .then(response =>  response.json())
    .then(json => {
      console.log(result.data);
      this.setState({
        flag: 1,
        books : result.data,
        volumeInfo: result.data.items.volumeInfo
       })
    })
    console.log("books:  "+this.state.books + " "+ this.state.description) //+ " " + this.state.description)
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
          <br></br>
          </div>
        );
      }else{
        return(
          <div>
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
              <Card.Img variant="top" href = "book image" src={ this.state.books.items[index].volumeInfo.imageLinks.thumbnail } onError={(e)=>{e.target.onerror = undefined; e.target.src="./images/cannot.png"}} style={{width : '100px'}} />
            </Card>
            <Card>
              <Card.Body>
              <Card.Title>
                {this.state.books.items[index].volumeInfo.title} {this.state.books.items[index].volumeInfo.author}
              </Card.Title>
              <Card.Text>
                {this.state.books.items[index].volumeInfo.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </CardColumns>
        <br></br>
      </div>
    )})}
    </ul>
    </div>

    );
    }
  }
}
