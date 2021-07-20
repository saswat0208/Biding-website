/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import {
  Grid,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import Widget from '../../utils/Widget/Widget';
import PageTitle from '../../utils/PageTitle/PageTitle';
import Card from './components/cards';
import axios from 'axios';
import { Categories } from '../../../Categories';
import { CircularProgress } from '@material-ui/core';


const myAuctions = (props) => {
  const [soldProducts, setSoldProducts] = useState([]);
  const [unsoldProducts, setUnsoldProducts] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // const classes = useStyles();
  let user = useSelector((state) => state.user);
  if (user !== undefined) {
    user = user.userData;
  }

  // Function to handle our data
  const dataHandler = async ({ user }) => {
    setLoading(true);
    try {
      const results = await axios.get('http://localhost:8080/getproduct');
      console.log(results.data);
      const totalProducts = [];
      Categories.map((i) => {
        const temp = [];
        results.data.map((j) => {
          if (j.category === i._id) {
            temp.push(j);
          }
        });
        if (temp.length > 0) {
          totalProducts.push({
            type: i.name,
            arr: temp,
          });
        }
      });
      console.log('totalProducts', totalProducts);
      const timeslots = ['', '10:00:00', '16:00:00', '20:00:00', '02:00:00'];
      const userProducts = [];
      const soldProducts = [];
      const unsoldProducts = [];
      const currentProducts = [];
      if (totalProducts) {
        totalProducts.forEach((item, index) => {
          const temp = item.arr.filter((el) => {
            let flag = false;
            if (el.buyers.length > 0) {
              el.buyers.forEach((i) => {
                flag = toString(i) === toString(user._id);
              });
            }
            return flag;
          });
          if (temp.length > 0) {
            userProducts.push({
              type: item.type,
              arr: temp,
            });
          }
        });
      }

      userProducts.forEach((item, index) => {
        item.arr.forEach((el) => {
          const date = el.date.split('T')[0];
          const auctionTime = new Date(date + ' ' + timeslots[el.timeslot ? el.timeslot : 1]);
          const currentTime = new Date();
          if (auctionTime < currentTime) {
            // const temp = [...soldProducts];
            if (el.soldTo !== undefined) {
              soldProducts.push(el);
            } else {
              currentProducts.push(el);
            }
          } else {
            // const temp = [...unsoldProducts];
            unsoldProducts.push(el);
          }
        });
      });
      console.log('userProducts', userProducts);
      console.log('soldProducts', soldProducts);
      console.log('unsoldProducts', unsoldProducts);
      console.log('currentProducts', currentProducts);
      setUserProducts(userProducts);
      setSoldProducts(soldProducts);
      setUnsoldProducts(unsoldProducts);
      setCurrentProducts(currentProducts);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(async () => {
    if (user) {
      await dataHandler({ user });
    }
  }, [user]);
  if (user === undefined || loading) {
    return <div>
      <CircularProgress />
    </div>;
  }
  return (
    <div style={{ flexGrow: 1 }}>
      <PageTitle title="My Auctions" />
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <Widget title="Ongoing Auctions">
            <Grid item>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
                {currentProducts.length > 0 && currentProducts.map((i) => {
                  return <Card type='ongoing' key={i} _id={i._id} price={i.basePrice}
                    img={i.images[0]} title={i.title} />;
                })}
                {currentProducts.length === 0 &&
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      textAlign: 'center',
                    }}><h1>No Current Auctions</h1></div>}
              </div>
            </Grid>
          </Widget>
        </Grid>
        <Grid item>
          <Widget title="Upcoming Auctions">
            <Grid item>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
                {unsoldProducts.length > 0 && unsoldProducts.map((i) => {
                  return <Card type='upcoming' key={i} _id={i._id} price={i.basePrice}
                    img={i.images[0]} title={i.title} />;
                })}
                {unsoldProducts.length === 0 &&
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                    }}><h1>No Upcoming Auctions</h1></div>}
              </div>
            </Grid>
          </Widget>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(myAuctions);
