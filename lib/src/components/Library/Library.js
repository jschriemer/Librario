import React from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import './Library.css';
import Media from 'react-media';
import MobileLibrary from './mobileLibrary';
import TabletLibrary from './tabletLibrary.js'
import DesktopLibrary from './desktopLibrary.js'


export default class Library extends React.Component{
    render(){
        return(
          <div className = 'library'>
          <Media queries={{
         small: "(max-width: 799px)",
         medium: "(min-width: 800px) and (max-width: 1199px)",
         large: "(min-width: 1200px)"}}>
          {matches => (
            <React.Fragment>
              <h1 style = {{color: "white"}}>Your Library </h1>
                {matches.small && <MobileLibrary />}
                {matches.medium && <TabletLibrary />}
                {matches.large && <DesktopLibrary />}
            </React.Fragment>
          )}
          </Media>
      </div>
    );
  }
}
