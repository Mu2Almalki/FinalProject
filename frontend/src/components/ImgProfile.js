import { useState, useEffect } from "react";
import '../App.css'
import axios from "axios";
import jwt_decode from "jwt-decode"
import React from 'react'

export default function ImgProfile() {

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

   const [user, setUser]=useState([]);
   const [profileImg , setProfileImg]=useState(decodedData.image)


    useEffect (() =>{
        {(function(){
            if(decodedData!=undefined){
              if(decodedData.type == "seller"){
                axios.get(`http://localhost:3001/seller/${decodedData.id}`)
                .then((res)=>{
                    console.log(res);
                    setUser(res.data);
                })
      
              }else if(decodedData.type == "byer") {
                axios.get(`http://localhost:3001/buyer/${decodedData.id}`)
                .then((res)=>{
                    console.log(res);
                    setUser(res.data);
                })
      
              }
            }
          }
          )()}
      
      
            
      
      
              },[]);

   const imageHandler =(e)=>{
                const reader = new FileReader();
                reader.onload=()=>{
                    if(reader.readyState === 2){
                        setProfileImg({profileImg : reader.result} )
                    }
        
                }
                reader.readAsDataURL(e.target.files[0])
        
            }



    return (
        <div>
             <div className='img-holder'>
                <div className='imgipro'>
                <img id='imgpp' className='imgpp' src={profileImg} alt="" />
                <i id='ipro' class="fa fa-edit" ></i>
                </div>
                <input type='file' name="image-upload" id="input" accept="image/*" onChange={imageHandler} ></input>
            </div>
        </div>
    )
}




// export default class ImgProfile extends Component {
    
//     state={
//         profileImg:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtNWVnKZZfy-1CLo75eO5vLhTWFZyeyc7QaI6GgdSalXDIJOCA6t0DSdDDMabrTOdjdYs&usqp=CAU'
//     }
//     imageHandler =(e)=>{
//         const reader = new FileReader();
//         reader.onload=()=>{
//             if(reader.readyState === 2){
//                 this.setState({profileImg : reader.result} )
//             }

//         }
//         reader.readAsDataURL(e.target.files[0])

//     }
//     render() {
//         const {profileImg} = this.state
//         return (
//             <div className='img-holder'>
//                 <div className='imgipro'>
//                 <img id='imgpp' className='imgpp' src={profileImg} alt="" />
//                 <i id='ipro' class="fa fa-edit" ></i>
//                 </div>
//                 <input type='file' name="image-upload" id="input" accept="image/*" onChange={this.imageHandler} ></input>
//             </div>
//         )
//     }
// }
