import { useState, useEffect } from "react";
import '../App.css'
import axios from "axios";
import jwt_decode from "jwt-decode"
import React from 'react'

export default function ImgUploud({setImg}) {

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
   const [imgSelected, setImgSelected] = useState("");

    useEffect (() =>{
        {(function(){
            if(decodedData!=undefined){
              if(decodedData.type == "seller"){
                axios.get(`/seller/${decodedData.id}`)
                .then((res)=>{
                    console.log(res);
                    setUser(res.data);
                })
      
              }else if(decodedData.type == "byer") {
                axios.get(`/buyer/${decodedData.id}`)
                .then((res)=>{
                    console.log(res);
                    setUser(res.data);
                })
      
              }
            }
          }
          )()}
      
      if(imgSelected !== "")
      {
        imageHandler()

      }
              },[imgSelected]);

              
   const imageHandler =(e)=>{
    const formData = new FormData();
    formData.append("file", imgSelected);
    formData.append("upload_preset", "d7grddkn");

    console.log("image ", formData);
    axios.post("http://api.cloudinary.com/v1_1/tuwaiq-bootcamp/image/upload",
        formData
      )
      .then((res) => {
        console.log(res.data.secure_url);
        setImg(res.data.secure_url);
      });
  };

    return (
        <div>
                <input  type='file' name="image-upload" id="input" accept="image/*"    onChange={(event) => {
                     setImgSelected(event.target.files[0]);

                  }}
                   ></input>
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
