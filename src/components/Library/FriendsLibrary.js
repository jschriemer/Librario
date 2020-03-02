import React from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button'
import firebase from '../../firebase'
import './Library.css';
import ReactLoading from 'react-loading';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Slide from 'react-reveal/Slide';
import * as login from '../Auth/Login.js';
import Avatar from 'react-avatar';


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
    setShow: false,
    current: "",
    fname: ""
}
}

componentDidMount() {
  const { friendUid, friendName } = this.props.location.state;
  this.setState({
    fname: friendName
  })
  db.collection("Users")
  .doc(friendUid).collection("Library")
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
addBook = (name, author, image, description) => {
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


 getBooks(){
   db.collection("Library")
   .get()
   .then(querySnapshot => {
  const data = querySnapshot.docs.map(doc => doc.data());
  return data;
  });
 }

 toolTap = (title, author, description, image) => {
   return(
     <Popover id="popover-basic">
     <Popover.Title as="h3">{title}</Popover.Title>
     <Popover.Content>
       {description}
       <br></br>
       <Button variant="secondary" type="submit" onClick = { () =>
         {this.addBook(
           title,
           author,
           description,
           image
         )
       }} size="sm">Shelf</Button>
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

 current = (name, author, description, image) => {
   const { friendUid } = this.props.location.state;
   var addBook =
   db.collection("Users")
   .doc(friendUid).collection("Library")
     .get()
     .then(querySnapshot => {
       const data = querySnapshot.docs.map(doc => doc.data());
       this.setState({
         current:data
        });
        this.handleRemoveBook = this.handleRemoveBook.bind(this)
     });
 }



    render(){
      const xxx = " ";
      const { friendUid } = this.props.location.state;
      db.collection('Users').doc(friendUid).get()
      .then(querySnapshot => {
      //var cata = querySnapshot.docs.map(doc => doc.data());
     });

      db.collection('Users').doc(friendUid)
      .collection('CurrentBook')
      .get()
      .then(querySnapshot => {
      var currentdata = querySnapshot.docs.map(doc => doc.data());
      this.setState({
        current: currentdata[0]
      })
     });
      if(this.state.bookcount > 0){
        if(this.state.current !== undefined){
        var deleted = this.state.delete;
        return(
          <div className = 'library'>
          <h1 style = {{color: "white"}}>{this.state.fname}'s Library </h1> 
            <CardColumns className = 'post'>
            <Card className = 'currentRead'>
            <Avatar className = "ava" name={this.state.fname} round={true}/>
              <Card.Title>{this.state.fname} is reading</Card.Title>
              <Card.Subtitle>{this.state.current.title} by {this.state.current.author}</Card.Subtitle>
              <Card.Img style={{width : '100px'}} src={this.state.current.coverurl}></Card.Img>
            </Card>
        {this.state.data.map((data, index) => {
         return(
           <div>
            <Slide bottom>
            <Card className = 'imgCardlib' key={data.uniqueId}>
            <OverlayTrigger trigger="click" placement="bottom" overlay={this.toolTap(data.title, data.author, data.description, data.coverurl)}>
              <Card.Img data-tip data-for='clickme' data-event='click' variant="top" src={data.coverurl} style = {{width: '10em', marginBottom: '30px', paddingRight: '0px'}} />
              </OverlayTrigger>
            </Card>
            </Slide>
          </div>
    );})}
      </CardColumns>
      </div>
    );
  }else{
    var deleted = this.state.delete;
    return(
      <div className = 'library'>
      <h1 style = {{color: "white"}}>{this.state.fname}'s Library </h1>
        <CardColumns className = 'post'>
        <Card className = 'currentRead'>
        <Avatar style = {{marginBottom: '30px'}} className = "ava" name={this.state.fname} round={true}/>
          <Card.Title>{this.state.fname} is not reading anything!</Card.Title>
        </Card>
    {this.state.data.map((data, index) => {
     return(
       <div>
        <Slide bottom>
        <Card className = 'imgCardlib' key={data.uniqueId}>
        <OverlayTrigger trigger="click" placement="bottom" overlay={this.toolTap(data.title, data.author, data.description, data.coverurl)}>
          <Card.Img data-tip data-for='clickme' data-event='click' variant="top" src={data.coverurl} style = {{width: '10em', marginBottom: '30px', paddingRight: '0px'}} />
          </OverlayTrigger>
        </Card>
        </Slide>
      </div>
);})}
  </CardColumns>
  </div>
);
  }
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
