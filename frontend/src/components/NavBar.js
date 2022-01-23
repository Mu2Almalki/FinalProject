import { BrowserRouter as Router, Route, Routes, useNavigate ,Link, useParams  } from "react-router-dom";
import { Navbar , Container , Nav ,NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutUs from './AboutUs'
import Home from "./Home";
import AppLogin from "./AppLogin";
import Seller from '../components/Seller'
import Buyer from '../components/Buyer'
import Main from "./Main";
import Cart from '../components/Cart';
import Profile from "./Profile";
import Order from "./Order";
import OrderB from './OrderB'
  import jwt_decode from "jwt-decode"
  import logo  from '../image/logo.jpg'
  import { BsCurrencyDollar  } from "react-icons/bs";
import Favorite from "./Favorite";
import Comment from "./Comment";
import { FaSignOutAlt , FaSignInAlt} from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";


function NavBar () {
  const [ refresh, setRefresh] = useState()
  // const id = useParams;

  let decodedData ;
  const storedToken = localStorage.getItem("token");
  if (storedToken){
    decodedData = jwt_decode(storedToken, { payload: true });
    //  console.log(decodedData);
     let expirationDate = decodedData.exp;
      var current_time = Date.now() / 1000;
      if(expirationDate < current_time)
      {
          localStorage.removeItem("token");
      }
   }

   const [cart,setCart]=useState()
   const [loading, setLoading] = useState(true);

  let navigate = useNavigate()
    const logout=(e)=>{
        e.preventDefault();
        localStorage.removeItem("token")
        navigate('/')

    }

    useEffect(() => {
      if(decodedData==undefined){
        setCart(0)
        setLoading(false);
      }
      else{
        console.log("lllll");
        axios.get(`/cart/cart/${decodedData.id}`).then((res) => {
          console.log(res.data);
          console.log(res.data[0]?.cart?.length);
          setCart(res.data[0]?.cart?.length)
          setLoading(false);
          setRefresh(false)
        });
      }
        
      }, [refresh]);

      if (loading) { 
        return (
        <div class="spinner-border text-danger" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      );
      }


  return(
    <div>

<Navbar bg="light" expand="lg" >
  <Container fluid>
    <Navbar.Brand  className="navbar-brand mt-2 mt-lg-0" href="#">
      <img
          src={logo}
          width="50px"
          height="40px"
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
        <Nav.Link ><Link className="nav-link"  to="/Home"> Stores </Link></Nav.Link>
        <Nav.Link ><Link className="nav-link" to="/AboutUs">About Us </Link></Nav.Link>
 
      </Nav>
      <Nav className="d-flex align-items-center" id="navd">
      {(function(){
        // console.log(decodedData)
    if(decodedData==undefined){
     return( <Link to="/AppLogin"
      className="dropdown-toggle d-flex align-items-center hidden-arrow"
      href="#"
      id="navbarDropdownMenuLink"
      role="button"
      dataMdbToggle="dropdown"
      ariaExpanded="false"
    >
       Login <FaSignInAlt/>
    </Link>
     )
    } 
     else{ 
       return(
       <>
       {decodedData.image?<img
        src={decodedData.image}
        className="rounded-circle"
        height="25"
        alt="Black and White Portrait of a Man"
        loading="lazy"
      />: <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuMj5Jt7LQ0OQSdpmi02mQyidiU5qLDV0o6g&usqp=CAU"
      className="rounded-circle"
      height="25"
      alt="Black and White Portrait of a Man"
      loading="lazy"
    />}
       
      <NavDropdown > 
      <NavDropdown.Item ><Link  className="nav-link" to="/Profile">My Profile</Link></NavDropdown.Item>

      {(function(){
  if(decodedData!=undefined){
          // console.log(decodedData)
          // console.log(decodedData.id)
  if(decodedData.type=="seller"){
        return(
          <>
 <NavDropdown.Item > <Link  className="nav-link" to={`/Seller/${decodedData.id}`}>My page</Link></NavDropdown.Item>
 <NavDropdown.Item > <Link  className="nav-link" to={`/Order/${decodedData.id}`}> Orders</Link></NavDropdown.Item>
          </>
              )
}else {
  return(
    <>
     <NavDropdown.Item > <Link  className="nav-link" to="/Favorite">My Favorite </Link></NavDropdown.Item>
     <NavDropdown.Item > <Link  className="nav-link" to="/OrderB">My Orders </Link></NavDropdown.Item>
    </>
  )
}
}
})()}
     


      <NavDropdown.Divider />
      <NavDropdown.Item href="#action5">
      <Link to="/Logout" className="link" onClick={(e)=>{logout(e)}} className="dropdown-item"> Logout <FaSignOutAlt/></Link>
      </NavDropdown.Item>
    </NavDropdown>

    {(function(){
  if(decodedData!=undefined){
          // console.log(decodedData)
          // console.log(decodedData.id)
  if(decodedData.type==="byer"){
        return(
          <>
          <Link to="/Cart">  <a class="nav-link" href="/Cart">
          <span class="badge badge-pill bg-danger">{cart}</span>
          <span><i class="fas fa-shopping-cart"></i></span>
        </a></Link>

          </>
              )
}
}
})()}
    
  </>)
     }
  })()}     
        
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
          <Route path="/Seller/:id" element={<Seller setRefresh={setRefresh}/>}/>
          <Route path="/Buyer/:id" element={<Buyer/>}/>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/Cart" element={<Cart setRefresh={setRefresh}/>}/>
          <Route path="/Favorite" element={<Favorite/>}/>
          <Route path="/Order/:id" element={<Order/>}/>
          <Route path="/OrderB" element={<OrderB/>}/>
</Routes> 
 </div>

  
    );

}

export default NavBar;


