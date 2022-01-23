import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MDBCol } from "mdb-react-ui-kit";
import jwt_decode from "jwt-decode";
import { Form, Row, Col, Button, Modal, Card } from "react-bootstrap";
import { FcLikePlaceholder , FcLike } from "react-icons/fc";
import ImgUploud from "./ImgUploud";
import {FaHeart,FaRegHeart} from 'react-icons/fa'
import swal from 'sweetalert' 

export default function Product({ item ,setProduct,setRefresh }) {
  const [addImg, setAddImg] = useState(item.image);
  const [addNameP, setAddNameP] = useState(item.name);
  const [addDis, setAddDis] = useState("");
  const [addPrice, setAddPrice] = useState("");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  
  const { id } = useParams();
  const [heart, setheart] = useState(true);
  const [updateUser, setUpdateUser] = useState(false);
  const [Img, setImg] = useState();

  let navegate = useNavigate();
  let decodedData;
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    decodedData = jwt_decode(storedToken, { payload: true });
    // console.log(decodedData);
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
      setLoading(false);
      setUpdateUser(false);
    });
  }, [updateUser]);

  // delete product

  const deleteProduct = (e, _id) => {
    e.preventDefault();
    // console.log(_id);
    axios
      .delete(`/product/delete/${_id}/${decodedData.id}`)
      .then((response) => {
        console.log(" deleted: ", response.data);
        setUser(response.data);
        setProduct(response.data.products);
      });
      
  };

  //  Update Product

  function updateProduct(e, _id) {
    e.preventDefault();
    console.log(_id);
    axios
      .put(`/product/put/${_id}/${decodedData.id}`, {
        image: addImg,
        nameProduct: addNameP,
        description: addDis,
        price: addPrice,
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setProduct(res.data.products);
        setUpdateUser(true)
      });
  }

  // add to cart

  function AddCart(_id) {
    console.log('qty')
    axios.post("/cart/cart/post", {
        product: _id,
        userId: decodedData.id,
        qty: qty,
      })
      .then((res) => {
        console.log(res);
        setRefresh(true)
      });
      swal({title:"added to cart"
    ,icon:'success'})
  }

  // add favorite
  function AddFav(_id) {
    setheart(!heart)
    axios
      .post("/favorite/post", {
        product: _id,
        userId: decodedData.id,
        qty: qty,
      })
      .then((res) => {
        console.log(res);
      });
  }

  function Heart() {
    if (heart) {
      setheart(false);
    } else {
      setheart(true);
    }
  }

  // modale
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <>
        <div className="containerpp">
          <div className="cardpp">
            <i className="fa fa-long-arrow-left"></i>
            <div className="imagepp">
              <img src={item.image}  style={{height:"250px" , width:"250px" }}/>
            </div>
            <div className="textpp">
              <br/>
              <h4>{item.nameProduct}</h4>

              <div className="pricepp">
                <h5>{item.price} SR</h5>
                {(function () {
                  if (decodedData != undefined) {
                    if (decodedData.type == "byer") {
                      return (
                        <div className="qtyp">
                        <i
                          onClick={() => setQty(qty - 1)}
                          className="fa fa-minus"
                        ></i>
                        <p>{qty}</p>
                        <i onClick={() => setQty(qty + 1)} className="fa fa-plus"></i>
                      </div>

                      );
                    }
                  }
                })()}
              </div>
              <div className="descriptionpp">
                <p>{item.description}</p>
              </div>
              {(function () {
                    if (decodedData != undefined) {
                      if (decodedData.type == "byer") {
                        return (
                            <div className="last_section">
                            <button onClick={()=>AddCart(item._id)}>Add to cart</button>
                            <div className="heart">
                              <i
                                onClick={() => {
                                  AddFav(item._id);
                                  Heart();
                                }}
                                className={`fa ${heart ? "fa-heart-o" : "fa-heart"}`}

                              ></i>
                              {/* {heart?<FaRegHeart  onClick={()=>{setHeart(!heart)}}></FaRegHeart>
                              :<FaHeart className="HEART" onClick={()=>{AddFav(item._id)}}></FaHeart>} */}
                            </div>
                          </div>
                        );
                      }
                    }
                  })()}
              
              {(function () {
                if (decodedData != undefined) {
                  if (decodedData.type == "seller") {
                    return (
                      <div className="btpp">
                        <button
                          className="bbt"
                          variant="outline-secondary"
                          onClick={handleShow}
                          
                        >
                          Update
                        </button>
                        <button
                          className="bbtt"
                          variant="outline-danger"
                          onClick={(e) => deleteProduct(e, item._id)}
                        >
                          Delete
                        </button>
                      </div>
                    );
                  }
                }
              })()}
            </div>
          </div>
        </div>
      </>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <br />

{(function () {
  if (decodedData != undefined) {
    if (decodedData.id == id) {
      return (
        <>
          <form>
            <ImgUploud setImg={setImg}/>
            <input
              type="text"
              onChange={(e) => setAddNameP(e.target.value)}
              placeholder="name"
            />
            <input
              onChange={(e) => setAddDis(e.target.value)}
              type="text"
              placeholder="dis"
            />
            <input
              onChange={(e) => setAddPrice(e.target.value)}
              type="text"
              placeholder="price"
            />
          </form>
        </>
      );
    }
  }
})()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) =>{ updateProduct(e, item._id);handleClose()}}>
         
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal><br/><br/>
    </div>
  );
}
