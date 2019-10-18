import Form from 'react-bootstrap/Form';
import React from 'react';
import './Search.css';
import Button from 'react-bootstrap/Button'
import axios from "axios";

const BASE_URL = `https://www.googleapis.com/books/v1/volumes`;

export default class Search extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      items : [],
      description: ''
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
     let items = json;
      console.log(result.data.items[0].searchInfo.textSnippet);
      this.setState({
        items : result.data.items,
        description : result.data.items[0].searchInfo.textSnippet
       })
    })
    console.log("items:  "+this.state.items + " "+ this.state.description) //+ " " + this.state.description)
  }


   /*fetchBooks = async () => {
        // Ajax call to API using Axios
        const result = await axios.get(`${BASE_URL}?q=${searchTerm}`);
        // Books result
        console.log(result.data);
    }*/

    // Submit handler
  //  handleSubmit = (e) => {
        // Prevent browser refreshing after form submission
  //      e.preventDefault();
        // Call fetch books async function
        //fetchBooks();
//}

  render(){
      return(
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
    );
  }
}

