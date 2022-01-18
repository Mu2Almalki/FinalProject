import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode"
import './order.css';

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
        <div>
<h1>ggggg</h1>
            
                    {/* <img src={item.products[0].products.image}/>
                    <h1>{item.products[0].products.nameProduct}</h1>
                    <p>{item.products[0].products.qty}</p> */}
                    {/*  */}
                    <div className="bbb_viewed">
                    <div className="container">
                    <div className="col">
                    <div className="bbb_main_container">
                    <div className="bbb_viewed_title_container">
                    <h3 className="bbb_viewed_title">Best selling products</h3>
                    
                    <div className="bbb_viewed_nav_container">
                            <div className="bbb_viewed_nav bbb_viewed_prev"><i className="fas fa-chevron-left"></i></div>
                            <div className="bbb_viewed_nav bbb_viewed_next"><i className="fas fa-chevron-right"></i></div>
                        </div>
                   </div>
                        <div className="bbb_viewed_slider_container">
                    <div className="carousel owl-theme ">
                    <div className="owl-item">
                    <div className="bbb_viewed_item d-flex  align-items-center justify-content-center text-center">
                    {order.map((item)=>{
                return(<div>
                    <div className="bbb_viewed_image"><img src={item.products[0].products.image} alt=""/></div>
                                    <div className="bbb_viewed_content text-center">
                                        <div className="bbb_viewed_price">₹12225<span>₹13300</span></div>
                                        <div className="bbb_viewed_name"><a href="#">{item.products[0].products.nameProduct}</a></div>
                                    </div>
                                   
                </div>)})}
                </div>
                                    </div>
                    </div>
                    </div>
                </div>
                    
                    
                    </div>
                    </div>
                    </div>
                   


                
          
            
        </div>
    )
}
