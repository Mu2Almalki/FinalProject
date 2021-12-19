import React from 'react'
import '../App.css';
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardOverlay, MDBCardImage } from 'mdb-react-ui-kit';
import {Card} from 'react-bootstrap'
import image from '../image/p.jpg'

export default function Main() {
    return (
        <div>
        <Card className="bg-dark text-black">
  <Card.Img src={image} alt="Card image" />
  <Card.ImgOverlay className='ct'>
    <Card.Title className='ct1'>
      {/* Card title */}
      </Card.Title>
    <Card.Text>
      {/* This is a wider card with supporting text below as a natural lead-in to
      additional content. This content is a little bit longer. */}
    </Card.Text>
  </Card.ImgOverlay>
</Card>
            
       
    </div>
    
    )
}


 {/* <MDBCard background='dark' className='text-white'>
      <MDBCardImage overlay src='image/p.jpg'  alt='...' />
      <MDBCardOverlay>
        <MDBCardTitle>Card title</MDBCardTitle>
        <MDBCardText>
          This is a wider card with supporting text below as a natural lead-in to additional content. This
          content is a little bit longer.
        </MDBCardText>
        <MDBCardText>Last updated 3 mins ago</MDBCardText>
      </MDBCardOverlay>
    </MDBCard> */}