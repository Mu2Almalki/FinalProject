import { createFactory, useState } from "react";
import axios from "axios";
import '../App.css';
import {useNavigate} from 'react-router-dom'
import logoLogin from '../image/logo-login.jpg'



 function Login(props) {
   
      let navigate = useNavigate()

    const [User , setUser]=useState([]);
    const [addEmail,setAddEmail]=useState('')
    const [addPassword,setAddPassword]=useState('')
  
    function handlPost(e){
      e.preventDefault()
      axios.post('http://localhost:3001/login' , {
          email :addEmail,
          password:addPassword

      })
      .then((res) => {
          console.log(res.data);
          if(res.data.user){
            const token = res.data.token;
            console.log(token)
            localStorage.setItem("token", token);
            
            navigate("/");

            setUser(res.data);
          }
      })
  }

    return (
      <div className="base.container" ref={props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image"><img className="img1" src={logoLogin}/></div>
          <div className="form">
          <div className="form-group">
                <label htmlFor="email" >Email</label>
                <input type="text" name="email" placeholder="email" onChange ={(e)=> setAddEmail(e.target.value)}></input>
              </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="text" name="password" placeholder="password" onChange ={(e)=> setAddPassword(e.target.value)}></input>
            </div>
          </div>

        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={(e)=>handlPost(e)} > Login</button>
        </div>

      </div>
    
     );
  }
export default Login;
