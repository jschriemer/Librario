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
import Slide from 'react-reveal/Slide';
import * as login from '../Auth/Login.js';
import Avatar from 'react-avatar';
import Media from 'react-media';


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
    current: ""
}
}

componentDidMount() {
  db.collection("Users")
  .doc(login.getUID()).collection("Library")
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

 toolTap = (title, author, description, coverurl) => {
   return(
     <Popover id="popover-basic">
     <Popover.Title as="h3">{title}</Popover.Title>
     <Popover.Content>
       {description}
       <br></br>
       <Button variant="secondary" type="submit" onClick = { () =>
         this.handleRemoveBook(
           title
         )
       }
       size="sm">Remove</Button>
       <Button variant="info" onClick = { () =>
         this.current(
           title,
           author,
           description,
           coverurl
         )
       } size="sm"> Currently Reading</Button>
     </Popover.Content>
   </Popover>)
 }

 handleRemoveBook = (name) => {
   db.collection('Users').doc(login.getUID())
   .collection('Library')
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
   var addBook =
     db.collection('Users').doc(login.getUID())
     .collection('CurrentBook')
     .doc(login.getUID())
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



    render(){
      db.collection('Users').doc(login.getUID())
      .collection('CurrentBook')
      .get()
      .then(querySnapshot => {
      var currentdata = querySnapshot.docs.map(doc => doc.data());
      this.setState({
        current: currentdata[0]
      })
     });

      if(this.state.bookcount > 0){
        var deleted = this.state.delete;
        return(
          <div className = 'library'>
          <Media queries={{
         small: "(max-width: 799px)",
         medium: "(min-width: 800px) and (max-width: 1199px)",
         large: "(min-width: 1200px)"
       }}>{matches => (
            <React.Fragment>
              {matches.small && <CardColumns className = 'postsmall'>
              <Card className = 'currentRead'>
              <Avatar className = "ava" name={login.getUser()} round={true}/>
                <Card.Title>You are reading</Card.Title>
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
      );
    })}
        </CardColumns>
            }
              {matches.medium && <CardColumns className = 'postmed'>
              <Card className = 'currentRead'>
              <Avatar className = "ava" name={login.getUser()} round={true}/>
              <Card.Title>You are reading</Card.Title>
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
      );
    })}
        </CardColumns>}
              {matches.large && <CardColumns className = 'postlarge'>}
            <Card className = 'currentRead'>
            <Avatar className = "ava" name={login.getUser()} round={true} style = {{marginBottom: '30px'}}/>
            <Card.Title>You are reading</Card.Title>
            <Card.Subtitle>{this.state.current.title} by {this.state.current.author}</Card.Subtitle>
            <Card.Img style={{width : '100px'}} src={this.state.current.coverurl}></Card.Img>
            </Card>
        {this.state.data.map((data, index) => {
         return(
           <div>
            <Slide bottom>
            <Card className = 'imgCardlib' key={data.uniqueId}>
            <OverlayTrigger trigger="click" placement="bottom" overlay={this.toolTap(data.title, data.author, data.description,data.coverurl)}>
              <Card.Img data-tip data-for='clickme' data-event='click' variant="top" src={data.coverurl} style = {{width: '10em', marginBottom: '30px', paddingRight: '0px'}} />
              </OverlayTrigger>
            </Card>
            </Slide>
          </div>
    );
  })}
      </CardColumns>}
      </React.Fragment>
    )}
  </Media>
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
