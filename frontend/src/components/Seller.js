import { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import { useParams , useNavigate} from "react-router-dom";
import { MDBModalHeader, MDBBtn, MDBModal, MDBModalDialog, MDBModalContent , MDBCol ,MDBRow,
  MDBModalTitle, MDBModalBody , MDBModalFooter } from 'mdb-react-ui-kit';
import React from 'react'
import {Form,Row,Col,Button , Modal , Card}from 'react-bootstrap'
import jwt_decode from "jwt-decode"
import { BsTrash } from "react-icons/bs";
import { FcRightDown2 } from "react-icons/fc";


function MyVerticallyCenteredModal(props) {

  let decodedData ;
    const storedToken = localStorage.getItem("token");
    if (storedToken){
      decodedData = jwt_decode(storedToken, { payload: true });
       console.log(decodedData);
       let expirationDate = decodedData.exp;
        var current_time = Date.now() / 1000;
        if(expirationDate < current_time)
        {
            localStorage.removeItem("token");
        }
     }

  const { id } = useParams();
  
  const [addImageUser, setAddImgUser ]= useState (null)
    const [addDetails , setAddDetails]= useState('')
    const [addImg,setAddImg]=useState(null)
    const [addNameP,setAddNameP]=useState('')
    const [addDis,setAddDis]=useState('')
    const [addPrice , setAddPrice]=useState('')
    const [product , setProduct]=useState([])
    const [user , setUser]=useState();
    

    // add product
  function handlPost(e){
    e.preventDefault()
            axios.post(`http://localhost:3001/product/post/${decodedData.id}` , {
                image:addImg ,
                nameProduct:addNameP,
                description:addDis,
                price:addPrice
            
            })
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
                setProduct(res.data.products);
                props.setUpdateUser(true)
            })
        }
  return (
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
            {/* <Form.Label>image</Form.Label>
            <Form.Control
              type="file"
              required
              name="file"
              onChange={(e) => setAddImg(e.target.value)}
              height="200px"
              width="200px"
            />
            */}

<input
        placeholder="Your Imge"
        onChange={(e) => setAddImg(e.target.value)}
        type="text"
        name="title"
      />
          </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder="name" onChange={(e) => setAddNameP(e.target.value)} />
    </Form.Group>
  </Row>

  <Form.Group className="mb-3" controlId="formGridAddress1">
    <Form.Label>Detils</Form.Label>
    <Form.Control placeholder="" onChange ={(e)=> setAddDis(e.target.value)+"SR"} />
  </Form.Group>

  

  <Row className="mb-4">
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>Price</Form.Label>
      <Form.Control onChange ={(e)=> setAddPrice(e.target.value)+"SR"} />
    </Form.Group>

   
  </Row>

  <Button  onClick={(e)=>{handlPost(e);props.onHide()}} style = {{backgroundColor: "black" ,color: "White"}}>
    Add
  </Button>
</Form>
        
      </Modal.Body>
    </Modal>
  );
}

export default function Seller() {

  const [modalShow, setModalShow] = React.useState(false);/*Modale*/
  
  const [addImg,setAddImg]=useState(null)
    const [addNameP,setAddNameP]=useState('')
    const [addDis,setAddDis]=useState('')
    const [addPrice , setAddPrice]=useState('')
    const [comment , setComment]= useState("")
    const [updateUser , setUpdateUser]= useState(false)
    

    const { id } = useParams();

    let navegate =useNavigate()  
    let decodedData ;
    const storedToken = localStorage.getItem("token");
    if (storedToken){
      decodedData = jwt_decode(storedToken, { payload: true });
       console.log(decodedData);
       let expirationDate = decodedData.exp;
        var current_time = Date.now() / 1000;
        if(expirationDate < current_time)
        {
            localStorage.removeItem("token");
        }
     }
  const [loading, setLoading] = useState(true);
    const [user , setUser]=useState();
    const [product , setProduct]=useState([])
    const [qty,setQty]=useState(1)


    useEffect(() => {
      axios.get(`http://localhost:3001/product/getProduct/${id}`).then((res) => {
        console.log(res.data);
        setUser(res.data);
        setProduct(res.data.products);
        setLoading(false);
        setUpdateUser(false)
      });
    }, [updateUser]);

    // delete product

    const deleteProduct = (e,_id) => {
      e.preventDefault()
      console.log(_id)
      axios.delete(`http://localhost:3001/product/delete/${_id}/${decodedData.id}`).then((response) => {
      console.log(" deleted: ", response.data)
      setUser(response.data);
      setProduct(response.data.products);
    })
 }

//  Update Product

function updateProduct (e,_id){
  e.preventDefault()
  console.log(_id)
  axios.put(`http://localhost:3001/product/put/${_id}/${decodedData.id }`, {
    image:addImg ,
    nameProduct:addNameP,
    description:addDis,
    price:addPrice

}).then((res)=>{
    console.log(res.data)
    setUser(res.data);
    setProduct(res.data.products)
  })
}

// add to cart

function AddCart(_id){
  // console.log(qty)
  axios.post("http://localhost:3001/cart/cart/post",{
    product:_id ,userId:decodedData.id,qty:qty
  }).then((res)=>{
      console.log(res)
  })

}

// add comment
function AddComment(){
  axios.post(`http://localhost:3001/comment/post/${id}/${decodedData.id}`,{
    comment:comment
  }).then((res)=>{
    console.log(res)
    setUpdateUser(true)
  })
}

// delete comment
function deleteComment(did){
  axios.delete(`http://localhost:3001/comment/delete/${did}`).then((response) => {
    console.log(" deleteComment: ", response.data)
    setComment(response.data);
    setUpdateUser(true)
  })
}

// add favorite
function AddFav(_id){
  axios.post("http://localhost:3001/favorite/post",{
    product:_id ,userId:decodedData.id,qty:qty
  }).then((res)=>{
      console.log(res)
  })

}

        // decoded
        const decode =()=>{
          if (decodedData != undefined){ 
            if(decodedData.id==id){
              return(
                <>
      <MDBBtn rippleDuration={5000} rippleColor='danger' color='light'  onClick={() => setModalShow(true)}>
        Add your Product
      </MDBBtn>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setUpdateUser={setUpdateUser}
      />

    </> )
            }
          }
        }
        // ___________________________________________

        if (loading) { 
          return (<div class="spinner-border text-danger" role="status">
          <span class="sr-only">Loading...</span>
        </div>);
        }

    return (
        <div className="seller">
<MDBRow>

<MDBCol md='4' className='col-example1'>
        
        <div className="s1">
              <img className="simg" src={user.imageUser} height="400px" width="400px" />
              <h1>{user.name}</h1>
              <p>{user.details}</p>
              {decode()}
              <h3>Add your comments here <FcRightDown2/></h3>

              <div className="cooment">
          {console.log(user.comments)}
        {user.comments.map((com)=>{
            return  (
              <div>
{(function(){
  if(decodedData!=undefined){
          console.log(decodedData)
          console.log(decodedData.id)
  if(decodedData.type=="seller"){
        return(
          <>
          <p>{com.comment}</p>
          </>
              )
}else {
  return(
    <>
    <p>{com.comment}</p>
            <BsTrash
              onClick={(e) =>
             deleteComment(com._id)
             }
            ></BsTrash>{" "}
    </>
  )
}
}
})()}

            </div>
            )
          })}
          {/* <input type="textarea" onChange={(e)=> setComment(e.target.value)} style={{border:"solid"}} ></input>
          <button onClick= {()=> AddComment()}>Send</button> */}

        </div>
        
              </div>
        <div className="cooment">
          {console.log(user.comments)}
        {user.comments.map((com)=>{
            return  (
              <div>
            <p>{com.comment}</p>
            <BsTrash
              onClick={(e) =>
             deleteComment(com._id)
             }
            ></BsTrash>{" "}
            </div>
            )
          })}
          <input type="textarea" onChange={(e)=> setComment(e.target.value)} ></input>
          <button onClick= {()=> AddComment()}>Send</button>

        </div>
             
              
        </MDBCol>
  
      <MDBCol md='8' className='col-example'>
      
        <div className='pb-3'><h2>My Products</h2> <hr style={{color:"rgb(236, 154, 154" , border:"solid"}}/>
        </div>
       
        <Row xs={1} md={3} className="g-4">
        {product.map((item)=>{
             return(
              <div > 
            <Col>
            <Card style={{ width: '18rem' }}>
             <Card.Img variant="top" alt="holder.js/100px180" src={item.image} />
              <Card.Body>
               <Card.Title>{item.nameProduct}</Card.Title>
               <Card.Text>
                    {item.description}
                    <h5>{item.price}SR</h5>
                    <span onClick = {()=> setQty(qty-1)} class="fa fa-minus-square text-secondary"></span><span class="px-md-3 px-1">{qty}</span><span onClick = {()=> setQty(qty+1)} class="fa fa-plus-square text-secondary"></span>
               </Card.Text>
               
               {/* <Button variant="primary">Go somewhere</Button> */}
               {(function(){
                  if(decodedData!=undefined){ 
                  if(decodedData.id==id){
                        return(
                          <>
               <Button variant="primary" onClick={(e)=>updateProduct(e,item._id)}>Update</Button>
               <Button variant="primary" onClick={(e)=>deleteProduct(e,item._id)}>Delete</Button>
        
                          </>
                              )
   }
  }
})()}

{(function(){
  if(decodedData!=undefined){ 
    if(decodedData.type=="byer"){
      return(
        <>
        <button onClick= {()=> AddFav(item._id)} >Fav</button>
        <Button variant="prima" onClick= {()=> AddCart(item._id)}>add to cart</Button>
          {/* <button>Fav</button> */}
        
        </>
      )
    }
  }
})()}
   
  </Card.Body>
</Card>
           
<br/>
          
            {(function(){
  if(decodedData!=undefined){ 
    if(decodedData.id==id){
      return(
        <>
        {/* <button onClick={(e)=>deleteProduct(e,item._id)}>Delete</button> */}
        {/* <button onClick={(e)=>updateProduct(e,item._id)}>Update</button> */}
        <form>
          {/* <input type="file"/> */}
          <input type="text" onChange ={(e)=> setAddNameP(e.target.value)} placeholder="name"/>
          <input onChange ={(e)=> setAddDis(e.target.value)}type="text" placeholder="dis" />
          <input onChange ={(e)=> setAddPrice(e.target.value)}type="text" placeholder="price" />
        </form>
        </>
      )
    }
  }
})()}
           
           </Col>
            
            </div>                
             )
         })}
           
           </Row>

      </MDBCol>
      
    </MDBRow>
        </div>
    )
}
