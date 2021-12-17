import { BrowserRouter as Router, Route, Routes, useNavigate ,Link  } from "react-router-dom";
import { Navbar , Container , Nav } from 'react-bootstrap';
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


function NavBar () {


  let navigate = useNavigate()
    const logout=(e)=>{
        e.preventDefault();
        localStorage.removeItem("token")
        navigate('/')

    }


    return (  
     <>

{/* // <!-- Navbar --> */}
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  {/* <!-- Container wrapper --> */}
  <div className="container-fluid">
    {/* <!-- Toggle button --> */}
    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>
    {/* <!-- Collapsible wrapper --> */}
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {/* <!-- Navbar brand --> */}
      <a className="navbar-brand mt-2 mt-lg-0" href="#">
        <img
          src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.png"
          height="15"
          alt="MDB Logo"
          loading="lazy"
        />
      </a>
      {/* <!-- Left links --> */}
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link  className="nav-link" exact to="/">  Home </Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link"  to="/Home"> business </Link>
        </li>
        <li class="nav-item">
       <Link class="nav-link" to="/AboutUs">About Us </Link>
        </li>
      </ul>
      {/* <!-- Left links --> */}
    </div>
    {/* <!-- Collapsible wrapper --> */}
    {/* <!-- Right elements --> */}
    <div className="d-flex align-items-center">
      {/* <!-- Icon --> */}
      <Link to="/Cart"> <a class="text-reset me-3" href="#"> 
        <i className="fas fa-shopping-cart"></i>
      </a></Link>
      {/* <!-- Notifications --> */}
      {/* <a
        class="text-reset me-3 dropdown-toggle hidden-arrow"
        href="#"
        id="navbarDropdownMenuLink"
        role="button"
        data-mdb-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="fas fa-bell"></i>
        <span class="badge rounded-pill badge-notification bg-danger">1</span>
      </a> */}
      {/* <ul
        class="dropdown-menu dropdown-menu-end"
        aria-labelledby="navbarDropdownMenuLink"
      >
        <li>
          <a class="dropdown-item" href="#">Some news</a>
        </li>
        <li>
          <a class="dropdown-item" href="#">Another news</a>
        </li>
        <li>
          <a class="dropdown-item" href="#">Something else here</a>
        </li>
      </ul> */}
      {/* <!-- Avatar --> */}
      <Link to="/AppLogin"
        className="dropdown-toggle d-flex align-items-center hidden-arrow"
        href="#"
        id="navbarDropdownMenuLink"
        role="button"
        data-mdb-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src="https://mdbcdn.b-cdn.net/img/new/avatars/2.jpg"
          className="rounded-circle"
          height="25"
          alt="Black and White Portrait of a Man"
          loading="lazy"
        />
      </Link>
      <Link to="/Profile" className="dropdown-item"> Profile</Link>

      <Link to="/Logout" className="link" onClick={(e)=>{logout(e)}} className="dropdown-item"> Logout</Link>
      <ul
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="navbarDropdownMenuLink"
      >
     <li> 
    
     <a className="dropdown-item" href="#">My profile</a>
     
       </li> 
        
        <li>
          <Link className="dropdown-item" to="/Seller/:id">Settings</Link>
        </li>
        <li>
          <Link to="/Logout" className="link" onClick={(e)=>{logout(e)}} className="dropdown-item"> Logout</Link>
        </li>
      </ul>

    </div>
    {/* <!-- Right elements --> */}
  </div>
  {/* <!-- Container wrapper --> */}
</nav>
{/* // <!-- Navbar --> */}

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
  </>

  
    );

}

export default NavBar;
