import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import { useParams , useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";



export default function Cart() {

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

    // let navegate =useNavigate()  

    const [loading, setLoading] = useState(true);
    const [cart , setCart]=useState([]); 
    const [userId,setUserId]=useState(decodedData.id)

    useEffect(() => {
        axios.get(`http://localhost:3001/cart/cart/${userId}`).then((res) => {
            console.log("in effect")
            console.log(res.data[0].cart);
          setCart(res.data[0].cart);
          setLoading(false);


        });
      }, []);


      if (loading) { 
      return (<p>loading...</p>);
    }


    return (
        <div>
            
            {cart.map((item)=>{
                return(
                    <div>
                        <img src={item.products.image}/>
                        <h1>{item.qty}</h1>
                    </div>
                )
            })}
          
        </div>
    )
}
