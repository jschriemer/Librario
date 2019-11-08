//footer.js
import React from 'react'
import '../stylesheets/DeckoCards.css';


export default class Footer extends React.Component{
  render(){
    return(
      <div className="footer">
    <div className = "fp">
      <span>Made with ❤️ by </span>
      <a href="https://github.com/jschriemer">John</a>
    </div>
  </div>
    )
  }
}
