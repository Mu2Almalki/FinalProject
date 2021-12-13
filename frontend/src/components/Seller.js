import { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import { useParams , useNavigate} from "react-router-dom";

import React from 'react'
// import ProductSchema from "../../../backend/Models/ProductSchema";

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
        <div>

            <h1>{user.name}</h1>
            <img src={user.imageUser}/>
            <p>{user.details}</p>
            <hr/><h2>products</h2>
         {user.products.map((item)=>{
             return(
                 <div>
            <img src={item.image}/>
            <h2>{item.nameProduct} </h2>
            <p>{item.description}</p>
            <h5>{item.price}</h5>
                 </div>
             )
         })}
           



        </div>
    )
}
