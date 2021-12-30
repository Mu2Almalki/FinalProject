import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { useParams, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBCardImage,
  MDBCard,
  MDBCardTitle,
  MDBCardText
} from "mdb-react-ui-kit";
import React from "react";
import { Form, Row, Col, Button, Modal, Card } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { BsTrash } from "react-icons/bs";
import { FcRightDown2 } from "react-icons/fc";
import Modale from "./Modale";
import Product from "./Product";
import Comment from "./Comment";

export default function Seller() {
  const [modalShow, setModalShow] = React.useState(false); /*Modale*/
  const [heart, setheart] = useState(true);

  const [addImg, setAddImg] = useState(null);
  const [addNameP, setAddNameP] = useState("");
  const [addDis, setAddDis] = useState("");
  const [addPrice, setAddPrice] = useState("");
  const [comment, setComment] = useState("");
  const [updateUser, setUpdateUser] = useState(false);

  const { id } = useParams();

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
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [product, setProduct] = useState([]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:3001/product/getProduct/${id}`).then((res) => {
      console.log(res.data);
      setUser(res.data);
      setProduct(res.data.products);
      setLoading(false);
      setUpdateUser(false);
    });
  }, [updateUser]);

  // add comment
  function AddComment() {
    axios
      .post(`http://localhost:3001/comment/post/${id}/${decodedData.id}`, {
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
      .delete(`http://localhost:3001/comment/delete/${did}`)
      .then((response) => {
        console.log(" deleteComment: ", response.data);
        setComment(response.data);
        setUpdateUser(true);
      });
  }

  // decoded
  const decode = () => {
    if (decodedData != undefined) {
      if (decodedData.id == id) {
        return (
          <>
            <button className="btonn"
              // rounded
              // color="dark"
              // col-6 mx-auto
              rippleDuration={5000}
              rippleColor="danger"
              // size='md'  active
              onClick={() => setModalShow(true)}
            >
              Add your Product
            </button>
             
             <Modale
              show={modalShow}
              onHide={() => setModalShow(false)}
              setUpdateUser={setUpdateUser}
            />
          </>
        );
      }
    }
  };
  // ___________________________________________

  if (loading) {
    return (
      <div class="spinner-border text-danger" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className="seller">
      <Card className="text-center">
  <Card.Header>
  <div className="s1">
  {/* <MDBCard style={{ maxWidth: '540px' }}> */}
      <MDBRow className='g-0'>
        <MDBCol md='4'>
        <img
              className="simg"
              src={user.imageUser}
              height="200px"
              width="200px"
            />
        </MDBCol>
        <MDBCol md='4'>
          <MDBCardBody>
            <MDBCardTitle><h1>{user.name}</h1></MDBCardTitle>
            <MDBCardText>
            <p>{user.details}</p>
            </MDBCardText>
            {decode()}           

          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    
            
  </div>

  </Card.Header>
  <Card.Body>
  <MDBCol md="12" className="col-example"> 
  <Row xs={2} md={3} className="g-4">
            {product.map((item) => {
              return (
                <div>
                  <>
                    <Product item={item}/>
                  </>

                </div>
              );
            })}
          </Row>
    </MDBCol>           
  </Card.Body>
  <Card.Footer className="text-muted"><Comment/></Card.Footer>
</Card>
      
    </div>
  );
}