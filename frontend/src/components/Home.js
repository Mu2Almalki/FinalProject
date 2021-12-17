import { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import {  Link  } from "react-router-dom";
import{Row , Col ,Card } from 'react-bootstrap'
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardOverlay, MDBCardImage , MDBRow ,MDBCol , MDBCardBody , MDBCardLink} from 'mdb-react-ui-kit';

 function Home() {
    const [user , setUser]=useState([]);
    const [addName, setAddName] = useState ('')
    const [addImg, setAddImg] = useState (null)
    const [addDetails , setAddDetails]= useState('')


   // const [enableEdit,setEnabeEdit] = useState(false)
   //  const [idUpdate,setIdUpdate] = useState()
   
    useEffect (() =>{
        axios.get('http://localhost:3001/home')
        .then((res)=>{
            console.log(res);
            setUser(res.data);
        })
        },[]);

        // function handlPost(e){
        //     e.preventDefault()
        //     axios.post('http://localhost:3001/home' , {
        //        imageUser:addImg ,
        //         name: addName ,
        //         details:addDetails

        //     })
        //     .then((res) => {
        //         console.log(res.data);
        //         setUser(res.data);
        //     })
        // }

        return (
         <div className="main">

 <Row xs={1} md={2} className="g-4">
  {user.map((item) => (
    <Col>
      <Card>
        <Card.Img variant="top" src={item.imageUser} />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>
          {item.details}
          </Card.Text>
        </Card.Body>
        
    <Card.Link href="#"><Link to={`/Seller/${item._id}`}>more</Link></Card.Link>

      </Card>
    </Col>
  ))}
</Row> 
       

    </div> );
      }
export default Home;

