/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { Component } from 'react';
import Card from './Card';
import './minicardcontainercss.css';
import img from '../../../utils/Images/arrow.png';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';


class miniCardContainer extends Component {
  render() {
    let c = -1;
    console.log('mini');
    return (
      <div className="mini-card-container"
        style={{ backgroundImage: 'url(/back4.jpg)' }} id={this.props.type}>
        <div className='mini-title' >
          <h1><Badge variant="dark">{this.props.type}</Badge></h1>
        </div>
        <div className="mini-flex-container">

          {

            this.props.array.map((i) => {
              c++;
              if (c < this.props.array.length && c <= 2) {
                return <Card key={i} _id={i._id} price={i.basePrice}
                  img={i.images[0]} title={i.title} />;
              }
            })

          }
          <Link to={{
            pathname: '/cards',
            state: {
              array: this.props.array,
              type: this.props.type,
            },
          }} className="btn btn-outline-primary arrow" >
            <img src={img} height='55' width='65' data-toggle="tooltip" title="View More" /></Link>
        </div>
      </div>
    );
  }
}

export default miniCardContainer;
