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
          .get(`/order/sellerOrder/${decodedData.id}`)
          .then((res) => {
            console.log(res.data);
            // console.log(decodedData.id);
            setOrder(res.data.order);
          });
      }, []);

    return (
        <div>
            <div class="container mt-5">
    <div class="d-flex justify-content-center row">
        <div class="col-md-8">
            <div class="p-3 bg-white rounded">
            {order.map((Oneorder,i)=>{return(<>
                <div class="row">
                    <div class="col-md-12">
                        <h1 class="text-uppercase">Order {i+1} </h1>
                        <div class="billed"><span class="font-weight-bold text-uppercase">Buyer's name:</span><span class="ml-1">{}</span></div>
                        <div class="billed"><span class="font-weight-bold text-uppercase">Date:</span><span class="ml-1">May 13, 2020</span></div>
                        <div class="billed"><span class="font-weight-bold text-uppercase">Order ID:</span><span class="ml-1"></span></div>
                    </div>
                    <div class="mt-3">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Oneorder.map((product)=>{return(<>
                              <tr>
                                    <td>{product.products.nameProduct}</td>
                                    <td>{product.qty}</td>
                                    <td>{product.products.price}</td>
                                    <td>{product.subtotal}</td>
                                </tr>
                                
                            
                            
                            </>)})}
                               
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
                {/* <hr/> */}
                <br></br>
                </>)})}
                
                {/* <div class="text-right mb-3"><button class="btn btn-danger btn-sm mr-5" type="button">Pay Now</button></div> */}
            </div>
        </div>
    </div>
</div>
            
        </div>
    )
}
