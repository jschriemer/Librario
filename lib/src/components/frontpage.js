//frontpage.js
import React from 'react';
import '../stylesheets/DeckoCards.css';
import Typist from 'react-typist';
import Delay from 'react-delay';
import './Cursor.scss';

export default class FrontPage extends React.Component{
    render(){
        return(
          <div className = 'frontPAge'>
            <div className = 'frontText'>
            <Typist
          className="frontHead"
          avgTypingDelay={120}
          cursor={{ hideWhenDone: true }}
        >
          Librario.
        </Typist>
        <Delay
  wait={2350}
>
              <Typist className="frontSub" cursor={{ hideWhenDone: true  }} avgTypingDelay={110}>
                Social media for books.
              </Typist>
              </Delay>
            </div>
         </div>
        )
    }
}
