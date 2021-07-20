/* eslint-disable react/prop-types */
import React from 'react';
import { Badge } from 'react-bootstrap';
import './bidcss.css';

export default function Bid(props) {
  console.log('Bid comp', props);
  return (
    <div className={`bid-container ${props.pos}`} >
      <h5>
        <Badge variant="primary" style={{ fontFamily: 'cursive' }}><b>{props.name}</b></Badge>
      </h5>
      <img src='/bid1.jpg' width='300' height='200'/>
      <h2 className="bid-text">I Bid :- </h2>
      <h2 className="bid-value"> <Badge variant="warning" >{props.bidValue} $</Badge></h2>
    </div>
  );
}
