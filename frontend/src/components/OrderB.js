import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode"
import './order.css';
import {Card , CardGroup , Row} from 'react-bootstrap'

export default function OrderB() {
 




    let decodedData ;
    const storedToken = localStorage.getItem("token");
    if (storedToken){
      decodedData = jwt_decode(storedToken, { payload: true });
    //    console.log(decodedData);
       let expirationDate = decodedData.exp;
        var current_time = Date.now() / 1000;
        if(expirationDate < current_time)
        {
            localStorage.removeItem("token");
        }
     }
    const [order , setOrder]=useState([])

    useEffect(() => {
        axios
          .get(`/order/${decodedData.id}`)
          .then((res) => {
            console.log(res.data);
            // console.log(decodedData.id);
            setOrder(res.data);
          });
      }, []);

    return (
        <div className='divorder' >
           
{order.length != 0 ?
<>
<Row xs={1} md={4} className="g-3">
 {order.map((item)=>{
                return(<div >
                     <CardGroup>
  <Card>
    <Card.Img variant="top" src={item.products[0].products.image} />
    <Card.Body>
      <Card.Title>{item.products[0].products.nameProduct}</Card.Title>
      <Card.Text>
      {item.products[0].products.price} SR 
      </Card.Text>
    </Card.Body>
    
  </Card>
  
</CardGroup>
                   {/* <img classNameName='imgorder' src={item.products[0].products.image} alt=""/>
                   <h2>{item.products[0].products.price} SR </h2>
                   <h3>{item.products[0].products.nameProduct}</h3>               */}
                </div>)})}
                
               </ Row>
               <div className='t'> <h1>total {order[0].TotalOrder} </h1> </div>
               </>
               : <h1></h1>}
    
        </div>
    )
}
