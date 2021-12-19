// import React,{Component} from "react";
// import {Form,Row,Col,Button }from 'react-bootstrap'
// import {storage} from '../'



// class ImageUpload extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { 
//             image :null,
//             url:''
//          }
//         this.handleChange =this.handleChange.bind(this);
//         this.handleUpload=this.handleUpload.bind(this)
//     }
//     handleChange =e=>{
//         if(e.target.files[0]){
//             const image= e.target.files[0]
//             this.setState(()=>({image}));

//         }
//     }

//     handleUpload=()=>{
//         const {image} =this.state;
//        const uploadTask= storage.ref(`images/${image.name}`).put(image)
//        uploadTask.on('state_changed' ,  
//        (snapshot)=>{
//         //   progrss function ....
//        }, 
//        (error) =>{
//         // error function ....
//            console.log(error)

//        },
//        ()=>{
//         // complete function ....
//         storage.ref('images').child(image.name).getDownloadURL().then(url =>{
//             console.log(url);
//             this.setState({url})
//         })

//        } )
//     }
//     render() { 
//         const style ={
//             height:"20vh",
//             display:'flex',
//             flexDirection:'column',
//             alignItems:'center',
//             justifyContent:'center'
//         };
//         return ( 
//             <div style={style}>
//             <Form.Label>image</Form.Label>
//             <img src={this.state.url || 'https://via.placeholder.com/400x300'} alt="Uploaded images" height='300' width='400' />
//             <Form.Control
//               type="file"
//               required
//               name="file"
//               onChange={this.handleChange}
//               />
//               <button onClick={this.handleUpload} >Upload</button>
 
//             </div>
//          );
//     }
// }
 
// export default ImageUpload;