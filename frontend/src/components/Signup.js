import { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import {  Link  } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import jwt from "jwt-decode"
import {Component} from 'react'
import logoLogin from '../image/logo-login.jpg'



import React from 'react'

 function Signup(props) {

    const [user , setUser]=useState([]);
    const [addName, setAddName] =useState ('')
    const [addEmail,setAddEmail]=useState('')
    const [addPassword,setAddPassword]=useState('')

    
    let navegate = useNavigate()
    
    // useEffect (() =>{
    //     axios.get('http://localhost:3001')
    //     .then((res)=>{
    //         console.log(res);
    //         setUser(res.data);
            
    //     })
    //     },[]);
    
        function handlPost(e){
            e.preventDefault()
            axios.post('http://localhost:3001/signup' , {
                name: addName ,
                email :addEmail,
                password:addPassword
    
            })
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
                if (res.data.user) {
                    console.log(res.data)
                    const token = res.data.token;
                    console.log(token)
                    localStorage.setItem("token", token);
                  }
                
            })
        }
 
      return (
        <div className="base.container"  ref={props.containerRef}>
          <div className="header">Signup</div>
          <div className="content">
            <div className="image"><img className="img1" src={logoLogin}/></div>
            <div className="form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" placeholder="username"
                onChange ={(e)=> setAddName(e.target.value)}></input>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" placeholder="email"
                onChange ={(e)=> setAddEmail(e.target.value)}></input>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="text" name="password" placeholder="password"
                 onChange ={(e)=> setAddPassword(e.target.value)}></input>
              </div>
            </div>
  
          </div>
          {/* <form>
           <input type="radio" name="usertype">Seller </input>
           <input type="radio" name="usertype">Buyer</input>
          </form> */}
          <div className="footer">
            <button type="button" className="btn" onClick={(e)=>handlPost(e)}> Signup </button>
          </div>
  
        </div>
      
       );
    }   
  export default Signup;

