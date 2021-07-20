/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Button,
  Grid,
  CircularProgress,
  Modal,
} from '@material-ui/core';
import { EditUserDetails, EditUserImg } from './EditUser';
import { EditItem } from './EditItem';
import axios from 'axios';
import { Categories } from '../../../Categories';
import { Redirect, withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../utils/PageTitle/PageTitle';
import Widget from '../../utils/Widget/Widget';
import { Typography } from '../../utils/Wrappers';
import { fetchProducts } from '../../../redux/_actions/product_actions';
import Table from './components/Table';
const useStyles = makeStyles((theme) => (
  {
    root: {
      flex: 1,
    },
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }
));
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const CustomModal = (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  let content = null;
  if (props.type === 'userImg') {
    content = <EditUserImg user={props.user} />;
  };
  if (props.type === 'userDetails') {
    content = <EditUserDetails user={props.user} />;
  }
  if (props.type === 'item') {
    content = <EditItem />;
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {content}
    </div>
  );

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
      >
        {body}
      </Modal>
    </div>
  );
};
const ProfilePage = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [soldProducts, setSoldProducts] = useState([]);
  const [unsoldProducts, setUnsoldProducts] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  let user = useSelector((state) => state.user);
  const totalProducts = useSelector((state) => state.product.products);
  if (user !== undefined) {
    user = user.userData;
  }
  // Function to handle our data
  const dataHandler = async ({ user }) => {
    setLoading(true);
    try {
      const results = await axios.get('http://localhost:8080/getproduct');
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
      const timeslots = ['', '10:00:00', '16:00:00', '20:00:00', '02:00:00'];
      const userProducts = [];
      const soldProducts = [];
      const unsoldProducts = [];
      if (totalProducts) {
        totalProducts.forEach((item, index) => {
          const temp = item.arr.filter((el) => el.writer === user._id);
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
            soldProducts.push({
              id: el._id,
              title: el.title,
              description: el.description,
              date: el.date.split('T')[0],
              category: item.type,
              basePrice: el.basePrice,
              status: el.soldTo ? 'sold' : 'unsold',
            });
          } else {
            // const temp = [...unsoldProducts];
            unsoldProducts.push({
              id: el._id,
              title: el.title,
              description: el.description,
              date: el.date.split('T')[0],
              category: item.type,
              basePrice: el.basePrice,
              status: 'upcoming',
            });
          }
        });
      });
      setUserProducts(userProducts);
      setSoldProducts(soldProducts);
      setUnsoldProducts(unsoldProducts);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const dispatch = useDispatch();
  useEffect(async () => {
    if (user) {
      await dataHandler({ user });
    }
  }, [user]);
  console.log(soldProducts);
  console.log(unsoldProducts);


  let content = (<div style={{
    height: '100%',
    width: '100%',
  }}>
    <CircularProgress style={{ flex: 1 }}/>
  </div>);
  if (user !== undefined && loading === false) {
    content = (<div className={classes.root}>

      <PageTitle title="My Profile" button={<Button
        variant="contained"
        size="large"
        color="secondary"
        onClick={() => {
          props.history.push('/myauctions');
        }}
      >
                My Auctions
      </Button>} />
      <Grid container style={{
        display: 'flex',
        flexDirection: 'row',
      }}
      spacing={6}>
        <Grid container style={{
          flexDirection: 'column',
          margin: '10px',
          height: '80%',
          paddingTop: '10px',
        }} spacing={4} sm={4}>
          <Grid item sm>
            <Widget type="editable" title="Avatar" clicked={() => {
              setModalType('userImg');
              setModalOpen(true);
            }} sm={12}>
              <div style={{
                display: 'flex',
                flexDirection: 'row-reverse',
              }}>
              </div>
              <div style={{ flex: 1 }}>
                <img src={user.image} height= '200px' width= '200px' alt='image not found' />
              </div>
            </Widget>
          </Grid>
          <Grid item sm>
            <Widget type="editable" title="Basic Information" clicked={() => {
              setModalType('userDetails');
              setModalOpen(true);
            }}>
              <div style={{
                'flex': 1,
                'display': 'flex',
                'flexDirection': 'row',
              }}>
                <Typography color="text"
                  size="md"
                  colorBrightness="primary">First Name:</Typography>
                <Typography
                  color="text"
                  colorBrightness="secondary"
                  size="md">{user.name}</Typography>
              </div>
              <div style={{
                'flex': 1,
                'display': 'flex',
                'flexDirection': 'row',
              }}>
                <Typography
                  color="text"
                  colorBrightness="primary"
                  size="md">Last Name:</Typography>
                <Typography
                  size="md" color="text"
                  colorBrightness="secondary">{user.lastname}</Typography>
              </div>
              <div style={{
                'flex': 1,
                'display': 'flex',
                'flexDirection': 'row',
              }}>
                <div>
                  <Typography
                    color="text"
                    size="md"
                    colorBrightness="primary">Email:</Typography>
                </div>
                <div>
                  <Typography
                    size="md"
                    color="text"
                    colorBrightness="secondary">{user.email}</Typography>
                </div>
              </div>
            </Widget>

          </Grid>
        </Grid>
        <Grid container style={{ flexDirection: 'column' }} spacing={4} sm={6}>
          {unsoldProducts.length > 0 &&
            <Grid item>
              <Widget title="My Products"clicked={() => {}}>
                <Table data={unsoldProducts }/>
              </Widget>
            </Grid>}
          {soldProducts.length > 0 &&
            <Grid item>
              <Widget title="My Products (past auctions)"clicked={() => { }}>
                <Table data={soldProducts} />
              </Widget>
            </Grid>
          }
        </Grid>
      </Grid>
    </div>);
  }
  return (<div>
    {content}
    <CustomModal
      user={user}
      type={modalType}
      open={isModalOpen}
      handleClose={() => {
        setModalOpen(false);
      } }/>
  </div>);
};

export default withRouter(ProfilePage);
