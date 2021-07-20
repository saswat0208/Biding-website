/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button, Descriptions } from 'antd';
import { useSelector } from 'react-redux';
import Axios from 'axios';
const timeslots = ['10:00 am', '4:00 pm', '8:00 pm', '2:00 am'];
function ProductInfo(props) {
  const [Product, setProduct] = useState({});
  const [Buyers, setBuyers] = useState([]);
  const [check, setCheck] = useState(false);
  const user = useSelector((state) => state.user);
  // const [Auctiondate, setAuctiondate] = useState({});

  useEffect(() => {
    setProduct(props.detail);
    setBuyers(props.detail.buyers);
    const Buyer = props.detail.buyers;
    Buyer && Buyer.find((element) => {
      if (element == user.userData._id) {
        console.log(element, '-', user.userData._id);

        setCheck(true);
      }
    });
    // setAuctiondate(date);
  }, [props.detail]);
  // useEffect(() => {
  //   console.log(Buyers, ' ', user.userData._id);
  //   Buyers.find((element) => {
  //     if (element == user.userData._id) {
  //       console.log(element, '-', user.userData._id);

  //       check = true;
  //     }
  //   });
  // }, [user]);

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: user.userData._id,
      productId: Product._id,
    };
    if (!check) {
      Axios.post('/api/product/add_user', variables).then((response) => {
        if (response.data.success) {
          alert('You have been added for the auction');
        } else {
          alert('Failed to save Comment');
        }
      });
    } else {
      Axios.post('/api/product/remove_user', variables).then((response) => {
        if (response.data.success) {
          alert('You have been removed from the auction');
        } else {
          alert('Failed to save Comment');
        }
      });
    }
    setCheck((value) => !value);
  };

  return (
    <div>

      <Descriptions title="Product Info">
        <Descriptions.Item label="Base Price"> {Product.basePrice}</Descriptions.Item>
        <Descriptions.Item label="Description"> {Product.description}</Descriptions.Item>
        {
          Product.date !== undefined &&
          <Descriptions.Item label="Date">
            {Product.date.toString().split('T')[0]}</Descriptions.Item>
        }
        <Descriptions.Item label="Time">  {timeslots[Product.timeslot - 1]}</Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <br />
      <label style={{ color: 'red', paddingLeft: '7rem' }}>
        Click to Join/Withdraw from the Auction</label>

      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>


        {
          (!check) ? (
          <Button size="large" shape="round" type="success"
            onClick={onSubmit}
          >
              Join
          </Button>
          ) : (
          <Button size="large" shape="round" type="danger"
            onClick={onSubmit}
          >
              Withdraw
          </Button>
          )

        }
      </div>

    </div>
  );
}

export default ProductInfo;
