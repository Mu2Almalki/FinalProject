import { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import {  Link  } from "react-router-dom";

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
                   <div className="maindiv">
                       
                      <img src={item.imageUser} className="photo"/>
                       <h1>{item.name}</h1>
                       <p> {item.details} </p>
                       <Link to={`/Seller/${item._id}`}>more</Link>
                            
                   </div> 
               )

           })
       }
       

    </div> );
      }
export default Home;