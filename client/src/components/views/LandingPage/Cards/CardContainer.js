/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { Component } from 'react';
import Card from './Card';
import './cardcontainercss.css';
import { Redirect } from 'react-router';
import Badge from 'react-bootstrap/Badge';


class CardContainer extends Component {
  render() {
    if (this.props.location.state === undefined) {
      // console.log('hello');
      return (
        <Redirect to='/'/>
      );
    };
    return (
      <div className="major-card-container">
        <div className='major-title' >
          <h1><Badge variant="dark">{this.props.location.state.type}</Badge></h1>
        </div>
        <div className="flex-container">
          {
            this.props.location.state.array.map((i) => {
              return <Card key={i} _id={i._id} price={i.basePrice}
                img={i.images[0]} title={i.title} />;
            })

          }
        </div>
      </div>
    );
  }
}

export default CardContainer;
