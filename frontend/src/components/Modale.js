import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import { Form, Row, Col, Button, Modal, Card } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { BsTrash } from "react-icons/bs";
import { FcRightDown2 } from "react-icons/fc";

export default function Modale(props) {
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

  const { id } = useParams();

  const [addImageUser, setAddImgUser] = useState(null);
  const [addDetails, setAddDetails] = useState("");
  // const [addImg,setAddImg]=useState(null)
  const [addNameP, setAddNameP] = useState("");
  const [addDis, setAddDis] = useState("");
  const [addPrice, setAddPrice] = useState("");
  const [product, setProduct] = useState([]);
  const [user, setUser] = useState();

  const [imgSelected, setImgSelected] = useState("");
  const [Img, setImg] = useState();
  
  // add img
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imgSelected);
    formData.append("upload_preset", "d7grddkn");

    await axios
      .post(
        "http://api.cloudinary.com/v1_1/tuwaiq-bootcamp/image/upload",
        formData
      )
      .then((res) => {
        console.log(res.data.secure_url);
        setImg(res.data.secure_url);
      });
  };

  // add product
  function handlPost(e) {
    e.preventDefault();
    axios
      .post(`/product/post/${decodedData.id}`, {
        image: Img,
        nameProduct: addNameP,
        description: addDis,
        price: addPrice,
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setProduct(res.data.products);
        props.setUpdateUser(true);
      });
  }


  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group className="position-relative mb-3">
                <input
                  type="file"
                  onChange={(event) => {
                    setImgSelected(event.target.files[0]);
                    uploadImage()

                  }}
                  placeholder="image"

                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="name"
                  onChange={(e) => setAddNameP(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Detils</Form.Label>
              <Form.Control
                placeholder=""
                onChange={(e) => setAddDis(e.target.value) + "SR"}
              />
            </Form.Group>

            <Row className="mb-4">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  onChange={(e) => setAddPrice(e.target.value) + "SR"}
                />
              </Form.Group>
            </Row>

            <Button
              onClick={(e) => {
                handlPost(e);
                props.onHide();
                
              }}
              style={{ backgroundColor: "black", color: "White" }}
            >
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
