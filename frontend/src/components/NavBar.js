import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navbar , Container , Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutUs from './AboutUs'
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import AppLogin from "./AppLogin";
import Seller from '../components/Seller'
function NavBar () {
    return (  
     <>
<Navbar>
  <Container>
 <Navbar.Brand href="#home">Navbar with text</Navbar.Brand> 
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        Signed in as: <a href="#login">Mark Otto</a>
      </Navbar.Text>
    </Navbar.Collapse>
  </Container>
</Navbar>

    <Navbar bg="dark" variant="dark">
    <Container>
    <Nav className="me-auto">
     <Nav.Link><Link exact to="/">  Home </Link></Nav.Link>
    {/* <Nav.Link><Link to="/Login">Login</Link></Nav.Link> */}
    <Nav.Link><Link to="/AppLogin">Login</Link></Nav.Link>
    {/* <Nav.Link><Link to="/Signup">Signup</Link></Nav.Link> */}
     <Nav.Link > <Link to="/AboutUs">About Us </Link></Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route path="/Login"  element={<Login/>} /> */}
          <Route path="/AppLogin"  element={<AppLogin/>} />
          {/* <Route path="/Signup"  element={<Signup/>} /> */}
          <Route path="/AboutUs" element={<AboutUs/>} />
          <Route path="/Seller/:id" element={<Seller/>}/>
</Routes> 
  </>

  
    );

}

export default NavBar;

