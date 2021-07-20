/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'react-bootstrap/Image';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import Container from 'react-bootstrap/Container';
// import { Link } from 'react-router-dom';
// import Badge from 'react-bootstrap/Badge';

import './widgetcss.css';

export default function Widget(props) {
  return (
    <div className="widget text-center border border-dark"
      style={{ backgroundImage: 'url(/brown.jpg)' }}>
      <div className='widget-text border border-dark'>


      </div>
      <div className='widget-img-container'>
        <Image src={`http://localhost:8080/${props.img}`}
          roundedCircle className='widget-img' />
      </div>


    </div>

  );
}


