import React from 'react'
import{Row , Col ,Card } from 'react-bootstrap'
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams , useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode"
import ImgProfile from './ImgProfile';

export default function Profile() {

    const { id } = useParams();
        const [user, setUser]=useState([]);
        const [addName, setAddName] = useState ('')
        const [addImg, setAddImg] = useState (null)
        const [addDetails , setAddDetails]= useState('')
        const [enableEdit,setEnabeEdit] = useState(false)
  const [idUpdate,setIdUpdate] = useState()

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

        // function editAuthor(e,_id){
        //     setIdUpdate(_id)
        //     setEnabeEdit(true)
          
        //   }
            

        function handlUpdate(e){
            e.preventDefault()
                    axios.put(`http://localhost:3001/update/${id}` , {
                        name:addName,
                        imageUser:addImg,
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
                <h1>My profile </h1>
                {/* <Row xs={1} md={2} className="g-4"> */}
    <Col>
      <Card>
        {/* <Card.Img className='imgcardpro' variant="top" src={user.imageUser} /> */}
        
 <ImgProfile/>
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>
          {user.details}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
    
{/* </Row> */}
                </div>
           <Card className='pro2'>
           <Card.Body>
           <Card.Text>

  {/* <div class="custom-file"> */}
      <br/>
    <input onChange ={(e)=> setAddImg(e.target.value)} type="file" class="custom-file-input" id="customFile"/>
    <label class="custom-file-label" for="customFile">Choose file</label>
  {/* </div> */}
  <br/>
  <label>
    Name:
    <input onChange ={(e)=> setAddName(e.target.value)} type="text" name="name" style={{border:"solid"}} />
  </label>
<br/>
<textarea onChange ={(e)=> setAddDetails(e.target.value)} style={{"width":"300px"}}>
  About me
</textarea>
<br/>
<button onClick={(e)=>{handlUpdate(e)}}>Save</button>
</Card.Text>

</Card.Body>
           </Card>
        </div>
    )
}
