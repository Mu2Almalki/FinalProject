import { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import { useParams , useNavigate} from "react-router-dom";
import { MDBModalHeader, MDBBtn, MDBModal, MDBModalDialog, MDBModalContent , MDBCol ,MDBRow,
  MDBModalTitle, MDBModalBody , MDBModalFooter } from 'mdb-react-ui-kit';
import React from 'react'
import {Form,Row,Col,Button }from 'react-bootstrap'


export default function Seller() {

// add product
  function handlPost(e){
    e.preventDefault()
            axios.post(`http://localhost:3001/books/book/${id}` , {
                // image:addImgBook ,
                // title: addTitle,
                // pages:addPages ,
                // price:addPrice ,
                
            })
            .then((res) => {
                console.log(res.data);
              
            })
        }
// 

    const { id } = useParams();

    let navegate =useNavigate()  

  const [loading, setLoading] = useState(true);
    const [user , setUser]=useState([]);
    const [addName, setAddName] = useState ('')
    const [addImageUser, setAddImgUser ]= useState (null)
    const [addDetails , setAddDetails]= useState('')
    const [addImg,setAddImg]=useState(null)
    const [addNameP,setAddNameP]=useState('')
    const [addDis,setAddDis]=useState('')
    const [addPrice , setAddPrice]=useState('')
    const [product , setProduct]=useState([])

    const [scrollableModal, setScrollableModal] = useState(false);
    const [optSmModal, setOptSmModal] = useState(false);


    useEffect(() => {
        axios.get(`http://localhost:3001/product/getProduct/${id}`).then((res) => {
          console.log(res);
          setUser(res.data);
          setLoading(false);
        });
      }, []);

      if (loading) {
          console.log('hi'+id)
        return (<p>loading...</p>);
      }

    return (
        <div className="seller">
<MDBRow>

<MDBCol md='4' className='col-example1'>
        
        <div className="s1">
              <img className="simg" src={user.imageUser}/>
              <h1>{user.name}</h1>
              <p>{user.details}</p>
              </div>
              <>
        <MDBBtn rippleDuration={5000} rippleColor='danger' color='light'onClick={() => setScrollableModal(!scrollableModal)}>Add Product</MDBBtn>

<MDBModal show={scrollableModal} setShow={setScrollableModal} tabIndex='-1'>
  <MDBModalDialog scrollable>
    <MDBModalContent>
      <MDBModalHeader>
        <MDBModalTitle>Add Product</MDBModalTitle>
        <MDBBtn
          className='btn-close'
          color='none'
          onClick={() => setScrollableModal(!scrollableModal)}
        ></MDBBtn>
      </MDBModalHeader>
      <MDBModalBody>
                {/* ______________________form________________________ */}

                <Form>
  <Row className="mb-3">
<Form.Group className="position-relative mb-3">
            <Form.Label>image</Form.Label>
            <Form.Control
              type="file"
              required
              name="file"
              // onChange={handleChange}
            />
           
          </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder="name" />
    </Form.Group>
  </Row>

  <Form.Group className="mb-3" controlId="formGridAddress1">
    <Form.Label>Detils</Form.Label>
    <Form.Control placeholder="" />
  </Form.Group>

  

  <Row className="mb-4">
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>Price</Form.Label>
      <Form.Control />
    </Form.Group>

   
  </Row>

  <Button variant="primary" type="submit">
    Add
  </Button>
</Form>
  
  
                  {/* ____________________________________________________ */}
                  </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
              
        </MDBCol>
  
      <MDBCol md='8' className='col-example'>
      
        <div className='pb-3'><h2>My Products</h2> <hr style={{color:"rgb(236, 154, 154" , border:"solid"}}/>
        </div>
       
        <MDBRow>
        {user.products.map((item)=>{
             return(
              <div>
              <MDBCol md='6' className='col-example'>
            
            <img src={item.image}/>
            <h2>{item.nameProduct} </h2>
            <p>{item.description}</p>
            <h5>{item.price}</h5>
            </MDBCol>
            
            </div>                
             )
         })}
           
        </MDBRow>
      </MDBCol>
      
    </MDBRow>
        </div>
    )
}
