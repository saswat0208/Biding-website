/* eslint-disable no-unused-vars */
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-scroll';
import './scrollercss.css';
import { Link as Links } from 'react-router-dom';
import Search from './Search';
import AlertTemplate from 'react-alert-template-basic';
import { positions, Provider } from 'react-alert';


const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
};


export default function Navigator() {
  return (
    <div className="scroller-container">
      <Provider template={AlertTemplate} {...options}>
        <Search />
      </Provider>


      <br />
      <div>
        <h2 style={{ fontFamily: 'cursive', color: 'brown' }}>
          <u><b><i>Auction Items</i></b></u></h2>
        <Links to='/product/upload'>
          <img src='/upload.png' style={{ width: '100%', height: '7rem' }} className="upload-image"
            data-toggle="tooltip" title="Upload Product" />
        </Links>

      </div>
      <br />
      <img src='/categories1.jpg' style={{ width: '100%', height: '7rem' }}/>
      <ListGroup >
        <ListGroup.Item action variant="primary" style={{ width: '100%', height: '10%' }}>
          <Link activeClass="active" to="Automobile" spy={true} smooth={true}>Automobiles</Link>
        </ListGroup.Item>
        <ListGroup.Item action variant="secondary" style={{ width: '100%', height: '10%' }}>
          <Link activeClass="active" to="Fashion" spy={true} smooth={true}>Fashion</Link>
        </ListGroup.Item>
        <ListGroup.Item action variant="success" style={{ width: '100%', height: '10%' }}>
          <Link activeClass="active" to="Electronics" spy={true} smooth={true}>Electronics</Link>
        </ListGroup.Item>
        <ListGroup.Item action variant="danger" style={{ width: '100%', height: '10%' }}>
          <Link activeClass="active" to="Sports" spy={true} smooth={true}>Sports</Link>
        </ListGroup.Item>
        <ListGroup.Item action variant="warning" style={{ width: '100%', height: '10%' }}>
          <Link activeClass="active" to="Antiques" spy={true} smooth={true}>Antiques</Link>
        </ListGroup.Item>
        <ListGroup.Item action variant="info" style={{ width: '100%', height: '10%' }}>
          <Link activeClass="active" to="Miscellaneous"
            spy={true} smooth={true}>Miscellaneous</Link>
        </ListGroup.Item>
      </ListGroup>

    </div>
  );
}
