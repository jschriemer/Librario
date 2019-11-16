import React from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button'
import firebase from '../../firebase'
import './Library.css';
import ReactLoading from 'react-loading';
import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import PopoverContent from 'react-bootstrap/PopoverContent';
import PopoverTitle from 'react-bootstrap/PopoverTitle';


const BASE_URL = `https://www.googleapis.com/books/v1/volumes`;
const db = firebase.firestore();


 //if bookcount > 0 then display cards otherwise display "you have no books here. Search for your favourites and add the to your library!"
export default class Library extends React.Component{
constructor(props){
  super(props);
  this.state = {
    bookcount: 0,
    data: '',
    delete: false,
    show: false,
    setShow: false
}
}

componentDidMount() {
  db.collection("Library")
    .get()
    .then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      this.setState({
        bookcount: data.length,
        data:data
       });
       this.handleRemoveBook = this.handleRemoveBook.bind(this)
    });
}


 getBooks(){
   db.collection("Library")
   .get()
   .then(querySnapshot => {
  const data = querySnapshot.docs.map(doc => doc.data());
  return data;
  });
 }

 toolTap = (title, author, description) => {
   return(
     <Popover id="popover-basic">
     <Popover.Title as="h3">{title}</Popover.Title>
     <Popover.Content>
       {description}
       <br></br>
       <Button variant="secondary" type="submit" onClick = { () =>
         {this.handleRemoveBook(
           title
         )
       }} size="sm">Remove</Button>
     </Popover.Content>
   </Popover>)
 }

 handleRemoveBook = (name) => {
   var docRef = db.
   collection("Library")
   .doc(name)
   .delete()
   .then(function() {
     alert("Document deleted");
     window.location.reload();
  })
   .catch(function(error) {
     console.error("Error deleting document: ", error);
   });
 }

 setShow(show){
   this.setState({
     show: !show
   })
 }



    render(){

      if(this.state.bookcount > 0){
        var deleted = this.state.delete;
        return(
          <div className = 'library'>
            <CardColumns className = 'post'>
        {this.state.data.map((data, index) => {
         return(
           <div>
            <Card className = 'imgCardlib' key={data.uniqueId}>
            <OverlayTrigger trigger="click" placement="bottom" overlay={this.toolTap(data.title, data.author, data.description)}>
              <Card.Img data-tip data-for='clickme' data-event='click' variant="top" src={data.coverurl} style = {{width: '10em', marginBottom: '30px', paddingRight: '0px'}} />
              </OverlayTrigger>
            </Card>
            {/*}<Card>
              <Card.Body>
              <Card.Title>
                {data.title}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {data.author}
              </Card.Subtitle>
              <Card.Text>
                {data.description}
              </Card.Text>
              <Button className = "likebtn" variant="secondary" type="submit" onClick = { () =>
                {this.handleRemoveBook(
                  data.title
                )
              }} size="sm">Remove</Button>
            </Card.Body>
          </Card>*/}
          </div>
    );})}
      </CardColumns>
      </div>
    );
    }
    return(
      <div className = 'emptylibrary'>
      {/*<p style = {{color: "white", fontSize: "28px", height: '85.7vh'}}>No books in your library.</p>*/}
      <div className = 'loading'>
        <ReactLoading type='cubes' height = '100vh' color='white' />
      </div>
      </div>
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

function authorCheck(index, books){
  console.log(books.items[index].volumeInfo.authors)
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
