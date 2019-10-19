import React from 'react';
import './App.css';
import Header from './Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import DeckoCards from './DeckoCards'
import Form from 'react-bootstrap/Form'
import Search from './Search'


function App() {
  return (
    <div className="App">
         <Header />
         {/*<Search />*/}
        <DeckoCards />
    </div>
  );
}

export default App;
