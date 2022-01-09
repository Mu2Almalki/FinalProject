import React from 'react'
import './comment.css'
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useParams, useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { FcRightDown2 } from "react-icons/fc";

export default function Comment() {
    const [comment, setComment] = useState("");
    const [updateUser, setUpdateUser] = useState(false);
    const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [product, setProduct] = useState([]);

  const { id } = useParams();

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };


  let navegate = useNavigate();
  let decodedData;
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    decodedData = jwt_decode(storedToken, { payload: true });
    console.log(decodedData);
    let expirationDate = decodedData.exp;
    var current_time = Date.now() / 1000;
    if (expirationDate < current_time) {
      localStorage.removeItem("token");
    }
  }

  useEffect(() => {
    axios.get(`/product/getProduct/${id}`).then((res) => {
      console.log(res.data);
      setUser(res.data);
      setProduct(res.data.products);
      setLoading(true);
      setUpdateUser(false);
    });
  }, [updateUser]);

     // add comment
  function AddComment() {
    axios
      .post(`/comment/post/${id}/${decodedData.id}`, {
        comment: comment,
      })
      .then((res) => {
        console.log(res);
        setUpdateUser(true);
      });
  }

   // delete comment
   function deleteComment(did) {
    axios
      .delete(`/comment/delete/${did}`)
      .then((response) => {
        console.log(" deleteComment: ", response.data);
        setComment(response.data);
        setUpdateUser(true);
      });
  }

    return (
    
    
     
      <div>  
     
         <div className="cooment">
           <br/>
           <h2>What our clients are saying about us?</h2>
             {loading ? 
             <> 
           
            {console.log(user.comments)}
            <div className="wrapper">
            <Carousel>
            {user.comments.map((com) => {
              return (
                <Carousel.Item interval={5000}>
                  <div className="content">
                    <div className="employee">
                    
                        <div className="h3 text-uppercase">{com.bayerId.name}</div>
                        <div className="h6 text-mute">Customer</div>
                    </div>
                    <div className="testimonial bg-white text-dark"> <span className="fas fa-quote-left"></span>
                        <div className="text-justify"> {com.comment}</div> <span className="fas fa-quote-right"></span>
                    </div>
                </div>
                {/* {(function () {
                if (decodedData != undefined) {
                  if (decodedData.id == id) {
                    return (
                       <div> */}
                      <BsTrash
                      style={{color:"red"}}
                        onClick={(e) => deleteComment(com._id)}
                      ></BsTrash>{" "}
                    {/* </div>)
                    }}})} */}
               
                  <Carousel.Caption>
                  
                  </Carousel.Caption>
                </Carousel.Item>
              
                
              );
            })}
              </Carousel>
              </div>
           
            
            </>
            : ""}
               
          </div>
          <div>

          {(function () {
  if (decodedData != undefined) {
    if (decodedData.type == "byer") {
      return (<>
      <input
              type="textarea"
              onChange={(e) => setComment(e.target.value)}
            ></input>
            <button onClick={() => AddComment()}>Send</button>
            <br/><br/>
      
      </>)
      }}})()}
          </div>
          
      

       
</div>          
    )
}
