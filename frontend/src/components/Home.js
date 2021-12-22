import { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import {  Link  } from "react-router-dom";
import{Row , Col ,Card } from 'react-bootstrap'
import { FaDollyFlatbed } from "react-icons/fa";


 function Home() {
    const [user , setUser]=useState([]);
    const [addName, setAddName] = useState ('')
    const [addImg, setAddImg] = useState (null)
    const [addDetails , setAddDetails]= useState('')

   
    useEffect (() =>{
        axios.get('http://localhost:3001/home')
        .then((res)=>{
            console.log(res);
            setUser(res.data);
        })
        },[]);

        return (
         <div className="main">

 <Row xs={1} md={2} className="g-4">
  {user.map((item) => (
    <Col>
      <Card>
        <Card.Img variant="top" src={item.imageUser} height="400" width="400" style={{border:"solid"}}/>
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>
          {item.details}
          </Card.Text>
        </Card.Body>
        
    <Card.Link href="#"><Link to={`/Seller/${item._id}`}><FaDollyFlatbed /></Link></Card.Link>

      </Card>
    </Col>
  ))}
</Row> 
       

    </div> );
      }
export default Home;

