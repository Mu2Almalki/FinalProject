import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import { useParams , useNavigate} from "react-router-dom";

export default function Buyer() {

    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true);
    const {id}= useParams()

    useEffect(() => {
        axios.get(`http://localhost:3001/buyer/${id}`).then((res) => {
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
            <img src={user.img}/>
            <h1>{user.name}</h1>
            <hr></hr>
            {/* {user.favorite.map((item)=>{
                return(
                    <div>
            <img src={item.image}/>
            <h2>{item.nameProduct} </h2>
                    </div>
                )
            })} */}

            
        </div>
    )
}
