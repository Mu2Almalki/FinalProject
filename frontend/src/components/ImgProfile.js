import React, { Component } from 'react'
import '../App.css'

export default class ImgProfile extends Component {
    
    state={
        profileImg:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtNWVnKZZfy-1CLo75eO5vLhTWFZyeyc7QaI6GgdSalXDIJOCA6t0DSdDDMabrTOdjdYs&usqp=CAU'
    }
    imageHandler =(e)=>{
        const reader = new FileReader();
        reader.onload=()=>{
            if(reader.readyState === 2){
                this.setState({profileImg : reader.result} )
            }

        }
        reader.readAsDataURL(e.target.files[0])

    }
    render() {
        const {profileImg} = this.state
        return (
            <div className='img-holder'>
                <div className='imgipro'>
                <img id='imgpp' className='imgpp' src={profileImg} alt="" />
                <i id='ipro' class="fa fa-edit" ></i>
                </div>
                <input type='file' name="image-upload" id="input" accept="image/*" onChange={this.imageHandler} ></input>
            </div>
        )
    }
}
