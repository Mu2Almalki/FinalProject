import { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import {  Link  } from "react-router-dom";
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardOverlay, MDBCardImage , MDBRow ,MDBCol , MDBCardBody , MDBCardLink} from 'mdb-react-ui-kit';

 function Home() {
    const [user , setUser]=useState([]);
    const [addName, setAddName] = useState ('')
    const [addImg, setAddImg] = useState (null)
    const [addDetails , setAddDetails]= useState('')


   // const [enableEdit,setEnabeEdit] = useState(false)
   //  const [idUpdate,setIdUpdate] = useState()
   
    useEffect (() =>{
        axios.get('http://localhost:3001/home')
        .then((res)=>{
            console.log(res);
            setUser(res.data);
        })
        },[]);

        function handlPost(e){
            e.preventDefault()
            axios.post('http://localhost:3001/home' , {
               imageUser:addImg ,
                name: addName ,
                details:addDetails

            })
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
        }



        return (
         <div className="main">
             {
           user.map((item) =>{
               console.log("hi")
               return (
                   <>
                   <div className="maindiv">
                       
                      <img src={item.imageUser} className="photo"/>
                       <h1>{item.name}</h1>
                       <p> {item.details} </p>
                       <Link to={`/Seller/${item._id}`}>more</Link>
                            
                   </div> 
                   <div>
                   <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                   <MDBCol>
                   <MDBCard>
                   <MDBCardImage
                      src={item.imageUser}
                        alt='Hollywood Sign on The Hill'
                                 position='top'
                                       />
                   <MDBCardBody>
                  <MDBCardTitle>{item.name}</MDBCardTitle>
                   <MDBCardText>
                       {item.details}
                      </MDBCardText>
                      <MDBCardLink ><Link to={`/Seller/${item._id}`}>more</Link></MDBCardLink>
                       </MDBCardBody>
                       </MDBCard>
                      </MDBCol>
                       </MDBRow>

                   </div>
                   </>
                  
               )

           })
       }
       

    </div> );
      }
export default Home;

