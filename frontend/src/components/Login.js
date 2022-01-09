import { createFactory, useState } from "react";
import axios from "axios";
import '../App.css';
import {useNavigate} from 'react-router-dom'
import logoLogin from '../image/logo-login.jpg'
import jwt from "jwt-decode"



 function Login(props) {
   
  let navegate = useNavigate()

    const [User , setUser]=useState([]);
    const [addEmail,setAddEmail]=useState('')
    const [addPassword,setAddPassword]=useState('')
    const [loginerr , setLoginerr]=useState({
      email:"",
     password:""
    })
    
    function handlPost(e){
      e.preventDefault()
      axios.post('/login' , {
          email :addEmail,
          password:addPassword

      })
      .then((res) => {
          console.log(res.data);
            if (res.data.errors){
              setLoginerr(res.data.errors)
              console.log(loginerr)

            }
          if (res.data.user) {
            console.log(res.data)
            const token = res.data.user;
            console.log(token)
            localStorage.setItem("token", token);
            const userSign = jwt(token);
            console.log(userSign.userType)
            if(userSign.type==="seller"){
              navegate('/Home');
            }else{
              navegate('/Home');
          }
        }
      })
  }

    return (
      <div className="base.container" ref={props.containerRef}>
        <div className="header">Loginnn</div>
        <div className="content">
          <div className="image">
            <img
              className="img1"
              src={
                "https://www.bancomail.com/images/png/various/bm-signin.png"
              }
            />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                placeholder="email"
                onChange={(e) => setAddEmail(e.target.value)}
              ></input>
              {loginerr.email == "" ? "" : 
                <p style={{color:"red"}}>{loginerr.email}</p>
                }
            </div>
            <div className="form-group">
              <label htmlFor="password" >Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={(e) => setAddPassword(e.target.value)}
              ></input>
              {loginerr.email == "" ? "" : 
                <p style={{color:"red"}}>{loginerr.password}</p>
                }
             
              {loginerr.password == "" ? "" : <div><p>{loginerr.password}</p></div>}
            </div>
            <div className="botnn">
              {" "}
              <button
                type="button"
                className="botn"
                onClick={(e) => handlPost(e)}
              >
                {" "}
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
export default Login;
