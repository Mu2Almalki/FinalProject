import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import'@fortawesome/fontawesome-free/css/all.min.css'; 
import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';
import Main from './components/Main';
import { FormCheck } from 'react-bootstrap';
import Footer from './components/Footer';
import { useState } from 'react';



function App() {
  
  return (
    <div className="App">
     <NavBar/>
     <Footer/>
    </div>
  );
}

export default App;
