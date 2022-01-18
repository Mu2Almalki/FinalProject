import React from 'react'
import{Row , Col ,Card } from 'react-bootstrap'
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams , useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode"
import ImgUploud from './ImgUploud';

export default function Profile() {

    const { id } = useParams();
        const [user, setUser]=useState([]);
        const [addName, setAddName] = useState ()
        const [addImg, setAddImg] = useState ()
        const [addDetails , setAddDetails]= useState()
        const [enableEdit,setEnabeEdit] = useState()
        
  const [idUpdate,setIdUpdate] = useState()
  const [Img, setImg] = useState();

  let navegate =useNavigate()  
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


      


        },[]);
            

        function handlUpdate(e){
          console.log(addName)
          console.log(addImg)
          console.log(addDetails)
            e.preventDefault()
                    axios.put(`/update/${decodedData.id}` , {
                        name:addName,
                        imageUser:Img,
                        details:addDetails
                        
                    })
                    .then((res) => {
                        console.log(res.data);
                        setUser(res.data);
                    })
                    // setEnabeEdit(false)
                }


    return (
        <div className='pro'> 
           <div className='pro1'>
             <br/><br/>
                <h4>My profile </h4>
                <br/><br/>
      <Card>
      <div className='img-holder'>
                <div className='imgipro'>
                <img id='imgpp' className='imgpp' src={user.imageUser} alt="" />
                
                {/* <i id='ipro' class="fa fa-edit" >
                    
                  </i> */}
                </div>
                <br/><br/>
                </div>
        
        <ImgUploud setImg={setImg}/>
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>
          <h5>{user.details}</h5>
          </Card.Text>
          <Card.Text>

{/* <div class="custom-file"> */}
    <br/>
{/* </div> */}
<br/><br/>
<label>
  <input placeholder="Name" onChange ={(e)=> setAddName(e.target.value)} type="text" name="name"  />
</label>
<br/>

{(function(){
if(decodedData!=undefined){
        console.log(decodedData)
        console.log(decodedData.id)
if(decodedData.type=="seller"){
      return(
        <>
<input placeholder=" About me" onChange ={(e)=> setAddDetails(e.target.value)} style={{"width":"300px"}}/>

    </>
            )
}
}
})()}

 <br/><br/>
<button onClick={(e)=>{handlUpdate(e)}}>Save</button>
</Card.Text>
        </Card.Body>
      </Card>
                </div>
  
       </div>
    )
}