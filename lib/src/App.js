import React from 'react';
import './stylesheets/App.css';
import Header from './components/Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import DeckoCards from './components/DeckoCards'
import Form from 'react-bootstrap/Form'


function App() {
  return (
    <div className="App">
        <Header />
        <DeckoCards />
    </div>
  );
}

export default App;
