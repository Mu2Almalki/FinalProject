import { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import { useParams , useNavigate} from "react-router-dom";
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardOverlay, MDBCardImage , MDBCol ,MDBRow } from 'mdb-react-ui-kit';
import React from 'react'


export default function Seller() {


    const { id } = useParams();

    let navegate =useNavigate()  

  const [loading, setLoading] = useState(true);
    const [user , setUser]=useState([]);
    const [addName, setAddName] = useState ('')
    const [addImageUser, setAddImgUser ]= useState (null)
    const [addDetails , setAddDetails]= useState('')
    const [addImg,setAddImg]=useState(null)
    const [addNameP,setAddNameP]=useState('')
    const [addDis,setAddDis]=useState('')
    const [addPrice , setAddPrice]=useState('')
    const [product , setProduct]=useState([])


    useEffect(() => {
        axios.get(`http://localhost:3001/product/getProduct/${id}`).then((res) => {
          console.log(res);
          setUser(res.data);
          setLoading(false);
        });
      }, []);

      if (loading) {
          console.log('hi'+id)
        return (<p>loading...</p>);
      }

    return (
        <div className="seller">
<MDBRow>
  
      <MDBCol md='8' className='col-example'>
      
        <div className='pb-3'><h2>products</h2> <hr/>
        </div>
       
        <MDBRow>
        {user.products.map((item)=>{
             return(
              <div>
              <MDBCol md='6' className='col-example'>
            
            <img src={item.image}/>
            <h2>{item.nameProduct} </h2>
            <p>{item.description}</p>
            <h5>{item.price}</h5>
            </MDBCol>
            
            </div>                
             )
         })}
           
        </MDBRow>
      </MDBCol>
      <MDBCol md='4' className='col-example1'>
        
      <div className="s1">
            <img src={user.imageUser}/>
            <h1>{user.name}</h1>
            <p>{user.details}</p>
            </div>
            
      </MDBCol>
    </MDBRow>
        </div>
    )
}
