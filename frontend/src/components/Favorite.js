import { useState, useEffect } from "react";
import axios from "axios";
import './fav.css';
import React from 'react'
import jwt_decode from "jwt-decode"
import { Link } from "react-router-dom";


export default function Favorite() {

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

    const [fav , setFav]= useState([])
    const [qty,setQty]=useState(1)

    useEffect(() => {
        axios
          .get(`/favorite/${decodedData.id}`)
          .then((res) => {
            console.log(res.data);
            // console.log(decodedData.id);
            setFav(res.data);
          });
      }, []);

     //   delete
  const deleteProduct = (e, _id) => {
    e.preventDefault();
    console.log(_id);
    axios
      .delete(`/favorite/delete/${decodedData.id}/${_id}`)
      .then((response) => {
        console.log(" deleted: ", response.data);
        setFav(response.data.favorite);
      });
  };

  function AddCart(_id){
    axios.post("/cart/cart/post",{
      product:_id ,userId:decodedData.id,qty:qty
    }).then((res)=>{
        console.log(res)
    })
  
  }
      

    return (
        <div>
            {fav.map((item) => {
                return(
                   <div> 
                       <div className="bg-light vh-100 d-flex justify-content-center align-items-center">
    <div className="container d-flex justify-content-center">
        <div className="cardo p-2">
            <div className="p-info px-3 py-3">
                <div>
                    <h5 className="mb-0">{item.nameProduct}</h5>
                </div>
                <div className="p-price d-flex flex-row"> <span>SR</span>
                    <h1>{item.price}</h1>
                </div>
            </div>
            <div className="text-center p-image"> <img src={item.image}/> </div>
            <div className="p-about">
                <p>{item.description}</p>
                <span onClick = {()=> setQty(qty-1)} class="fa fa-minus-square text-dark"></span><span class="px-md-3 px-1">{qty}</span><span onClick = {()=> setQty(qty+1)} class="fa fa-plus-square text-dark"></span>
            </div>
            <div className="buttons d-flex flex-row gap-3 px-3"> <button onClick={(e) =>deleteProduct(e, item._id)} className="btn btn-danger w-100">Delete</button>
            <button onClick= {()=> AddCart(item._id)} className="btn btn-outline-danger w-100">Buy Now</button> </div>
        </div>
    </div>
</div>
                       
                   </div> /* div map*/ 
                       
                      
                )
            }
            )}
        </div>
      
    )
}
