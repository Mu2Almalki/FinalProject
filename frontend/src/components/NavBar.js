import { BrowserRouter as Router, Route, Routes, useNavigate ,Link  } from "react-router-dom";
import { Navbar , Container , Nav ,NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutUs from './AboutUs'
import Home from "./Home";
import Login from "../components/Login";
import Signup from "./Signup";
import AppLogin from "./AppLogin";
import Seller from '../components/Seller'
import Buyer from '../components/Buyer'
import Main from "./Main";
import Cart from '../components/Cart';
import Profile from "./Profile";
import { MDBModalHeader, MDBBtn, MDBModal, MDBModalDialog, MDBModalContent , MDBCol ,MDBNavbarItem,
  MDBNavbarNav, MDBCollapse , MDBIcon  ,MDBNavbarBrand , MDBNavbar , MDBContainer} from 'mdb-react-ui-kit';
  import jwt_decode from "jwt-decode"


function NavBar () {

  let decodedData ;
  const storedToken = localStorage.getItem("token");
  if (storedToken){
    decodedData = jwt_decode(storedToken, { payload: true });
     console.log(decodedData);
     let expirationDate = decodedData.exp;
      var current_time = Date.now() / 1000;
      if(expirationDate < current_time)
      {
          localStorage.removeItem("token");
      }
   }


  let navigate = useNavigate()
    const logout=(e)=>{
        e.preventDefault();
        localStorage.removeItem("token")
        navigate('/')

    }


  return(
    <div>

<Navbar bg="light" expand="lg" >
  <Container fluid>
    <Navbar.Brand  className="navbar-brand mt-2 mt-lg-0" href="#">
      <img
          src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.png"
          height="15"
          alt="MDB Logo"
          loading="lazy"
          />
          </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link ><Link  className="nav-link" exact to="/">  Home </Link></Nav.Link>
        <Nav.Link ><Link className="nav-link"  to="/Home"> business </Link></Nav.Link>
        <Nav.Link ><Link className="nav-link" to="/AboutUs">About Us </Link></Nav.Link>

      </Nav>
      <Nav className="d-flex align-items-center" id="navd">
      <Link to="/AppLogin"
        className="dropdown-toggle d-flex align-items-center hidden-arrow"
        href="#"
        id="navbarDropdownMenuLink"
        role="button"
        dataMdbToggle="dropdown"
        ariaExpanded="false"
      >
        <img
          src="https://mdbcdn.b-cdn.net/img/new/avatars/2.jpg"
          className="rounded-circle"
          height="25"
          alt="Black and White Portrait of a Man"
          loading="lazy"
        />
      </Link>
      <NavDropdown > 
          <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action5">
          <Link to="/Logout" className="link" onClick={(e)=>{logout(e)}} className="dropdown-item"> Logout</Link>
          </NavDropdown.Item>
        </NavDropdown>
        <Link to="/Cart"> <a class="text-reset me-3" href="#"> 
        <i className="fas fa-shopping-cart"></i>
      </a></Link>
        
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>



  <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/Home" element={<Home />} />
          {/* <Route path="/Login"  element={<Login/>} /> */}
          <Route path="/AppLogin"  element={<AppLogin/>} />
          {/* <Route path="/Signup"  element={<Signup/>} /> */}
          <Route path="/AboutUs" element={<AboutUs/>} />
          <Route path="/Seller/:id" element={<Seller/>}/>
          <Route path="/Buyer/:id" element={<Buyer/>}/>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/Cart" element={<Cart/>}/>
</Routes> 
  </div>

  
    );

}

export default NavBar;


// {(function(){
//   if(decodedData!=undefined){
//     navbar
//     if(decodedData.id==id){