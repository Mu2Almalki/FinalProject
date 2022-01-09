import { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import {  Link  } from "react-router-dom";
import{Row , Col ,Card } from 'react-bootstrap'
import { FiShoppingBag } from "react-icons/fi";


 function Home() {
    const [user , setUser]=useState([]);
    const [addName, setAddName] = useState ('')
    const [addImg, setAddImg] = useState (null)
    const [addDetails , setAddDetails]= useState('')

   
    useEffect (() =>{
        axios.get('/home')
        .then((res)=>{
            console.log(res);
            setUser(res.data);
        })
        },[]);

        return (
         <div className="main">

 <Row xs={1} md={3} className="g-4">
  {user.map((item) => (
    <Col>
      <Card>
        <Card.Img variant="top" src={item.imageUser} height="400" width="400"/>
        <Card.Body>
          <Card.Title>{item.name} <Card.Link href="#"><Link to={`/Seller/${item._id}`}><FiShoppingBag /></Link></Card.Link></Card.Title>
          <Card.Text>
          {item.details}
          </Card.Text>
        </Card.Body>
        
    

      </Card>
    </Col>
  ))}
</Row><br/> 
       

    </div> );
      }
export default Home;

