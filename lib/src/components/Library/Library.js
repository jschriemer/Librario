import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import axios from "axios";

const BASE_URL = `https://www.googleapis.com/books/v1/volumes`;
 //if bookcount > 0 then display cards otherwise display "you have no books here. Search for your favourites and add the to your library!"
export default class Library extends React.Component{
constructor(props){
  super(props);
  this.state = {
    bookcount: 0
  };
}
    render(){
      if(this.state.bookcount > 0){
        return(
          <div className = 'library'>
        {/*this.state.books.items.map((books, index) => {*/}
        <div className = 'body'>
          <CardColumns className = 'post' style={{display: 'flex', flexDirection: 'row', width: '70rem'}}>
            <Card className = 'imgCard' key=''>
              <Card.Img variant="top" src='' style={{width : '100px'}} />
            </Card>
            <Card>
              <Card.Body>
              <Card.Title>
                title
              </Card.Title>
              <Card.Text>
                descrip
              </Card.Text>
              <Button className = "likebtn" variant="secondary" type="submit" size="sm">Remove</Button>
            </Card.Body>
          </Card>
        </CardColumns>
        <br className = "inbet"></br>
      </div>
    </div>
    );
    }
    return(
      <p>Library</p>
    );
  }
  }

function bookimagecheck(index, books){
  if(books.items[index].volumeInfo.imageLinks === undefined){
    console.log("undefined image! @ " + books.items[index]);
    return '../images/cannotfind.png';
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
