import { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import {  Link  } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import jwt from "jwt-decode"
import {Component} from 'react'
import logoLogin from '../image/logo-login.jpg'
import {  MDBRadio} from 'mdb-react-ui-kit';
import {ButtonGroup ,ToggleButton } from 'react-bootstrap'


import React from 'react'

 function Signup(props) {

    const [user , setUser]=useState("byer");
    const [addName, setAddName] =useState ('')
    const [addEmail,setAddEmail]=useState('')
    const [addPassword,setAddPassword]=useState('')

    const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Active', value: '1' },
    { name: 'Radio', value: '2' },
    { name: 'Radio', value: '3' },
  ];

    
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
                password:addPassword,
                userType: user
    
            })
            .then((res) => {
                console.log(res.data);
                setUser(res.data.user);
                if (res.data.user) {
                    console.log(res.data)
                    const token = res.data.user;
                    console.log(token)
                    localStorage.setItem("token", token);
                    const userSign = jwt(token);
                    console.log(userSign.userType)
                    if(userSign.type==="seller"){
                       navegate(`/Seller/${userSign.id}`);
                    }else if (userSign.type==="byer"){
                     navegate(`/Buyer/${userSign.id}`);
                  }
                }
                
            })
        }
 
      return (
        <div className="base.container"  ref={props.containerRef}>
          <div className="header">Signup</div>
          <div className="content">
            <div className="image"><img className="img1" src={"https://user.intspreneur.com/user/app-assets/img/gallery/login.png"}/></div>
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
                <label htmlFor="password" >Password</label>
                <input type="password" name="password" placeholder="password"
                 onChange ={(e)=> setAddPassword(e.target.value)}></input>
              </div>
              <div>
              {/* <ButtonGroup className="mb-2">
        <ToggleButton
          id="toggle-check"
          type="checkbox"
          variant="secondary"
          checked={checked}
          value="1"
          onChange={(e) => setChecked(e.currentTarget.checked)}
        >
          Checked
        </ToggleButton>
      </ButtonGroup>
      <br />
              <ButtonGroup className="mb-2">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="secondary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
          ))}
          </ButtonGroup> */}
      <MDBRadio onChange={()=>{setUser('seller')}} name='flexRadioDefault' id='flexRadioDefault1' label='Seller' />
      <MDBRadio onChange={()=>{setUser('byer')}} name='flexRadioDefault' id='flexRadioDefault2' label='Buyer' defaultChecked />
    </div>
              
              <div className="footer">
            <button type="button" className="botn" onClick={(e)=>handlPost(e)}> Signup </button>
          </div>
          
              
            </div>
  
          </div>
  
        </div>
      
       );
    }   
  export default Signup;

