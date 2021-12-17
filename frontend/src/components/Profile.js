import React from 'react'
import{Row , Col ,Card } from 'react-bootstrap'
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams , useNavigate} from "react-router-dom";

export default function Profile() {

    const { id } = useParams();
        const [user, setUser]=useState([]);
        const [addName, setAddName] = useState ('')
        const [addImg, setAddImg] = useState (null)
        const [addDetails , setAddDetails]= useState('')
        const [enableEdit,setEnabeEdit] = useState(false)
  const [idUpdate,setIdUpdate] = useState()


 useEffect (() =>{
        axios.get('http://localhost:3001/seller/:id')
        .then((res)=>{
            console.log(res);
            setUser(res.data);
        })
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
                <Row xs={1} md={2} className="g-4">
  { user.map((item) => (
    <Col>
      <Card>
        <Card.Img variant="top" src={item.imageUser} />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>
          {item.details}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
                </div>
           <div className='pro2'>
           <form>
  <div class="custom-file">
      <br/>
    <input onChange ={(e)=> setAddImg(e.target.value)} type="file" class="custom-file-input" id="customFile"/>
    <label class="custom-file-label" for="customFile">Choose file</label>
  </div>
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
  
</form>
           </div>
        </div>
    )
}
