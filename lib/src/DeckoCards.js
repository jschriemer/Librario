import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import './DeckoCards.css';

//todo n ot hard code image, title, and post


export default class DeckoCards extends React.Component{
    render(){
        return(
      <div className = 'body'>
        <br></br>
          <CardColumns className = 'post' style={{display: 'flex', flexDirection: 'row', width: '70rem'}}>
            <Card className = 'imgCard'>
              <Card.Img variant="top" src={ 'https://i.pinimg.com/236x/51/99/6f/51996ff64a9ffc28a90639df2632387a--sci-fi-novels-sci-fi-books.jpg' } style={{width : '100px'}} />
            </Card>
            <Card>
              <Card.Body>
              <Card.Title>Title</Card.Title>
              <Card.Text>
              ...  post content ...
              </Card.Text>
            </Card.Body>
            </Card>
          </CardColumns>
        <br></br>
      </div>
        );
    }
}
