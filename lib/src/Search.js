import Form from 'react-bootstrap/Form';
import React from 'react';
import './Search.css';

export default class Search extends React.Component{
  render(){
      return(
        <div>
        <br></br>
        <Form.Control className= "booksearch" size="lg" type="text" placeholder="Search by Book or Author" />
        </div>
      );
  }
}
