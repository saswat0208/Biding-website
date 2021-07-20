import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import './mycarouselcss.css';


class MyCarousel extends Component {
  render() {
    return (
      <div className="carousel-container" >
        <Carousel>
          <Carousel.Item >

            <img
              className="image"
              src='/auction.jpg'
              alt="First slide"

              style={{ border: '2px solid red' }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="image"
              src='Dark.jpg'
              alt="Third slide"
              style={{ border: '2px solid red' }}
            />
            <div className='carousel-title'>
              <span className="badge badge-warning">
                <h1 style={{ fontFamily: 'cursive' }}><u><b><i>FEATURES</i></b></u></h1></span>
            </div>
            <div className="carousel-textbox">
              <br />
              <br />
              <ul >
                <li><h1 style={{ color: 'white', fontFamily: 'cursive' }}>
                  Wide Range Of Listings</h1></li>
                <li><h1 style={{ color: 'white', fontFamily: 'cursive' }}>
                  Very smooth Procedure</h1></li>
                <li><h1 style={{ color: 'white', fontFamily: 'cursive' }}>
                  Promotes Transparency</h1></li>
                <li><h1 style={{ color: 'white', fontFamily: 'cursive' }}>
                  Bring any item to Auction</h1></li>
                <li><h1 style={{ color: 'white', fontFamily: 'cursive' }}>
                  Analyze your Past Records </h1></li>
                <li><h1 style={{ color: 'white', fontFamily: 'cursive' }}>
                  Authentic Users and Items </h1></li>
              </ul>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="image"
              src='e-bid.jpg'
              alt="Second slide"
              style={{ border: '2px solid red' }}

            />
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default MyCarousel;
