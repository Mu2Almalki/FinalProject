import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MDBCol } from "mdb-react-ui-kit";
import jwt_decode from "jwt-decode";
import { Form, Row, Col, Button, Modal, Card } from "react-bootstrap";

export default function Product({ item }) {
  const [addImg, setAddImg] = useState(null);
  const [addNameP, setAddNameP] = useState("");
  const [addDis, setAddDis] = useState("");
  const [addPrice, setAddPrice] = useState("");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const [heart, setheart] = useState(true);
  const [updateUser, setUpdateUser] = useState(false);

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
    axios.get(`http://localhost:3001/product/getProduct/${id}`).then((res) => {
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
    console.log(_id);
    axios
      .delete(`http://localhost:3001/product/delete/${_id}/${decodedData.id}`)
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
      .put(`http://localhost:3001/product/put/${_id}/${decodedData.id}`, {
        image: addImg,
        nameProduct: addNameP,
        description: addDis,
        price: addPrice,
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setProduct(res.data.products);
      });
  }

  // add to cart

  function AddCart(_id) {
    console.log('qty')
    axios.post("http://localhost:3001/cart/cart/post", {
        product: _id,
        userId: decodedData.id,
        qty: qty,
      })
      .then((res) => {
        console.log(res);
      });
  }

  // add favorite
  function AddFav(_id) {
    axios
      .post("http://localhost:3001/favorite/post", {
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
              <img src={item.image} />
            </div>
            <div className="textpp">
              <h3>{item.nameProduct}</h3>

              <div className="pricepp">
                <h3>{item.price} SR</h3>
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
      </Modal>
    </div>
  );
}
