import React from 'react'
import '../App.css';
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardOverlay, MDBCardImage } from 'mdb-react-ui-kit';
import {Card} from 'react-bootstrap'
import image from '../image/p2.jpg'
import {Link} from 'react-dom'
import bg1 from '../image/bg1.jpg'

export default function Main() {
    return (
        <div>
        <Card className="bg-dark text-black">
  <Card.Img src={bg1} alt="Card image" />
  <Card.ImgOverlay className='ct'>
    <Card.Title className='ct1'>
    <div className='cell' style={{height:"660px"}}>
    <div className="hcell">
    My Business
    </div>
    <div className="textcell">Add your store or order from our stores </div>
    <div className="link-area"><a href="/Home" class="button-style1" title=" Start " target="_self"> <span>Start</span></a>
    </div>
    </div>
      </Card.Title>
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