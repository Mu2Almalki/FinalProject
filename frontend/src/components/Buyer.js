import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import { useParams , useNavigate} from "react-router-dom";
import {  MDBCol ,MDBRow } from 'mdb-react-ui-kit';
export default function Buyer() {

    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true);
    const {id}= useParams()

    useEffect(() => {
        axios.get(`/buyer/${id}`).then((res) => {
          console.log(res.data);
          setUser(res.data);
          setLoading(false);
        });
      }, []);


      if (loading) {
        console.log('hi'+id)
      return (<p>loading...</p>);
    }

    return (
        <div>
          <MDBRow>

<MDBCol md='4' className='col-example1'>
        
        <div className="s1">
              <img className="simg" src={user.imageUser} height="400px" width="400px" />
              <h1>{user.name}</h1>
              <hr></hr>
              </div>
             
              
        </MDBCol>
  
      <MDBCol md='8' className='col-example'>
      
        <div className='pb-3'><h2>My Favorite</h2> <hr style={{color:"rgb(236, 154, 154" , border:"solid"}}/>
        </div>
       
  
            {/* {user.favorite.map((item)=>{
                return(
                    <div>
            <img src={item.image}/>
            <h2>{item.nameProduct} </h2>
                    </div>
                )
            })} */}
</MDBCol>
</MDBRow>

        </div>
    )
}
