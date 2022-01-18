import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode"

export default function Order() {
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
        <div>
            <h1>order</h1>
            {order.map((item)=>{
                return(<div>
                    

                </div>)
            })}
            
        </div>
    )
}
