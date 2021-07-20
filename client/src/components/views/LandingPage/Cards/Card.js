/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import './cardcss.css';
import img from '../../../utils/Images/img2.jpg';


class Cards extends Component {
  render() {
    console.log('card', this.props.img);
    return (
      <div className="card text-center border border-dark"
        style={{ backgroundImage: 'url(/images.jfif)' }} >
        <div className="overflow">
          <img src={`http://localhost:8080/${this.props.img}`}
            className="card-img-top card-image border border-succcess" />
        </div>
        <div className="card-body text-dark" >
          <div >
            <Badge variant="info"><div className="card-title">
              <h3 style={{ color: 'brown' }}>
                <i><u><b>{this.props.title.toUpperCase()}</b></u></i></h3>
            </div></Badge>
          </div>
          <div className="card-text">
            <Badge pill variant="warning"><h4>Base Price:-{this.props.price} $</h4></Badge>
          </div>
          <div>
            <Link to={`/product/${this.props._id}`}
              className="btn btn-outline-success link" >
              <h5 style={{ color: 'white' }}><b>REGISTER HERE</b></h5></Link>
          </div>
        </div>


      </div>

    );
  }
}

Cards.propTypes = {
  id: PropTypes.string.isRequired,
};


export default Cards;
