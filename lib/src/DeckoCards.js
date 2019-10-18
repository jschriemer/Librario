import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import './DeckoCards.css';
import Form from 'react-bootstrap/Form';
import './Search.css';
import Button from 'react-bootstrap/Button'
import axios from "axios";

//todo n ot hard code image, title, and post
const BASE_URL = `https://www.googleapis.com/books/v1/volumes`;


export default class DeckoCards extends React.Component{
  constructor() {
    super();
    this.state = {//set initial state
      value: '',
      items : [],
      description: '',
      title: '',
      author: '',
      image: ''
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
        items : result.data.items,
        description : result.data.items[0].volumeInfo.description,
        title: result.data.items[0].volumeInfo.title,
        author: result.data.items[0].volumeInfo.authors,
        image: result.data.items[0].volumeInfo.imageLinks.thumbnail
       })
    })
    console.log("items:  "+this.state.items + " "+ this.state.description) //+ " " + this.state.description)
  }

    render(){
        return(
          <div>
          <Form inline onSubmit={this.handleSubmit}>
          <br></br>
          <br></br>
          <Form.Control
            className= "booksearch" size="lg" type="text"
            placeholder="Search by Book or Author"
            value={this.state.value} onChange={this.handleChange}
            />
            <Button className = "submitbtn" variant="secondary" type="submit" size="lg">
            Submit
            </Button>
          </Form>
      <div className = 'body'>
        <br></br>
          <CardColumns className = 'post' style={{display: 'flex', flexDirection: 'row', width: '70rem'}}>
            <Card className = 'imgCard'>
              <Card.Img variant="top" src={ this.state.image } style={{width : '100px'}} />
            </Card>
            <Card>
              <Card.Body>
              <Card.Title>{this.state.title}{this.state.author}</Card.Title>
              <Card.Text>
                {this.state.description}
              </Card.Text>
            </Card.Body>
            </Card>
          </CardColumns>
        <br></br>
      </div>
      </div>
        );
    }
}
