/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import axios from 'axios';
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from 'recharts';

// styles
import useStyles from './styles';

// components
import Widget from '../../utils/Widget/Widget';
import PageTitle from '../../utils/PageTitle';
import { Typography } from '../../utils/Wrappers';
import Dot from '../../utils/Sidebar/components/Dot';
import Table from './components/Table/Table';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Categories } from '../../../Categories';

function Dashboard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [totalProducts, setTotalProducts] = useState([]);
  const [totalProductsSold, setTotalProductsSold] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);
  const [unsoldProducts, setUnsoldProducts] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [userProductsSold, setUserProductsSold] = useState([]);
  const [userProductsBought, setUserProductsBought] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pieChartData, setPieChartData] = useState([]);
  const [userProductsByDate, setUserProductsByDate] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  // const classes = useStyles();
  let user = useSelector((state) => state.user);
  if (user !== undefined) {
    user = user.userData;
  }
  // Function to handle our data
  const dataHandler = async ({ user }) => {
    setLoading(true);
    try {
      console.log('user', user);
      const results = await axios.get('http://localhost:8080/getproduct');
      console.log(results.data);
      setTotalProducts(results.data);
      const temp = results.data.filter((item) => {
        return item.soldTo !== undefined;
      });
      setTotalProductsSold(temp);
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
      const userProductsSold = [];
      const userProductsBought = [];
      const soldProducts = [];
      const unsoldProducts = [];
      const currentProducts = [];
      const pieChartData1 = [];
      const tableData1 = [];
      const color = ['primary', 'secondary', 'success', 'warning', 'info', 'green'];
      let k = 0;
      if (totalProducts) {
        totalProducts.forEach((item, index) => {
          const temp = item.arr.filter((el) => el.writer === user._id);
          const temp1 = item.arr.filter((el) => el.soldTo === user._id);
          if (temp.length > 0) {
            userProductsSold.push({
              type: item.type,
              arr: temp,
            });
            if (temp1.length > 0) {
              userProductsBought.push({
                type: item.type,
                arr: temp1,
              });
            }
          }
          const temp2 = item.arr.filter((el) => el.soldTo === user._id || el.writer === user._id);
          if (temp2.length > 0) {
            userProducts.push({
              type: item.type,
              arr: temp2,
            });
            pieChartData1.push({
              name: item.type,
              value: temp2.length,
              color: color[k++],
            });
          }
        });
      }
      const userProductsSold1 = [];
      userProductsSold.map((item) => {
        item.arr.map((el) => {
          userProductsSold1.push(el);
        });
      });
      const userProductsBought1 = [];
      userProductsBought.map((item) => {
        item.arr.map((el) => {
          userProductsBought1.push(el);
        });
      });
      const data = [...userProductsBought1, ...userProductsSold1];
      const groups = userProductsSold1.reduce((groups, item) => {
        const date1 = new Date(item.date);
        const date = date1.toDateString();
        // date = [...date].reverse().join('');
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(item);
        return groups;
      }, {});

      // Edit: to add it in the array format instead
      const groupArrays = Object.keys(groups).map((date) => {
        return {
          date: date,
          value: groups[date].length,
        };
      });
      const groups1 = userProductsBought1.reduce((groups, item) => {
        const date1 = new Date(item.date);
        const date = date1.toDateString();
        // date = [...date].reverse().join('');
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(item);
        return groups;
      }, {});

      // Edit: to add it in the array format instead
      const groupArrays1 = Object.keys(groups1).map((date) => {
        return {
          date: date,
          value1: groups[date].length,
        };
      });
      const groupArrays2 = [{
        date: new Date(2020, 0, 1).toDateString(), value: 0,
      }, {
        date: new Date(2020, 1, 3).toDateString(),
        value1: 4,
      }, ...groupArrays, ...groupArrays1];
      groupArrays2.sort((a, b) => new Date(a.date) - new Date(b.date));
      const groupArrays3 = groupArrays2.map((item) => {
        return {
          date: item.date.substring(0, 10),
          value: item.value ? item.value : 0,
          value1: item.value1 ? item.value1 : 0,
        };
      });
      setUserProductsByDate(groupArrays3);
      const userResults = await axios.get('http://localhost:8080/api/users/all');
      console.log(userResults);
      setAllUsers(userResults.data);
      userProducts.forEach((item, index) => {
        item.arr.forEach((el) => {
          const date = el.date.split('T')[0];
          const auctionTime = new Date(date + ' ' + timeslots[el.timeslot ? el.timeslot : 1]);
          const currentTime = new Date();
          if (auctionTime < currentTime) {
            // const temp = [...soldProducts];
            // Auctions that have finished
            if (el.soldTo !== undefined) {
              soldProducts.push(el);
              if (el.soldTo === user._id) {
                tableData1.push({
                  title: el.title,
                  date: new Date(date).toDateString(),
                  status: 'bought',
                  description: el.description,
                  basePrice: el.basePrice,
                  category: item.type,
                  buyer: userResults.data.find((it) => {
                    return it._id === el.soldTo;
                  }),
                  seller: null,
                });
              } else {
                tableData1.push({
                  title: el.title,
                  date: new Date(date).toDateString(),
                  status: 'sold',
                  description: el.description,
                  basePrice: el.basePrice,
                  category: item.type,
                  buyer: null,
                  seller: userResults.data.find((it) => {
                    return it._id === el.writer;
                  }),
                });
              }
            } else {
              // Auctions that are going on
              currentProducts.push(el);
              tableData1.push({
                title: el.title,
                date: new Date(date).toDateString(),
                status: 'ongoing',
                description: el.description,
                basePrice: el.basePrice,
                category: item.type,
                buyer: null,
                seller: null,
              });
            }
          } else {
            // Future auctions
            // const temp = [...unsoldProducts];
            unsoldProducts.push(el);
            tableData1.push({
              title: el.title,
              date: new Date(date).toDateString(),
              status: 'upcoming',
              description: el.description,
              basePrice: el.basePrice,
              category: item.type,
              buyer: null,
              seller: null,
            });
          }
        });
      });
      tableData1.sort((a, b) => new Date(b.date) - new Date(a.date));
      console.log('userProductsByDate', groupArrays3);
      console.log('userProducts', userProducts);
      console.log('soldProducts', soldProducts);
      console.log('unsoldProducts', unsoldProducts);
      console.log('currentProducts', currentProducts);
      console.log('itemByCategories', pieChartData1);
      console.log('UserPorductsSold', userProductsSold1);
      console.log('UserProductsBought', userProductsBought1);
      setUserProducts(userProducts);
      setSoldProducts(soldProducts);
      setUnsoldProducts(unsoldProducts);
      setCurrentProducts(currentProducts);
      setPieChartData(pieChartData1);
      setUserProductsBought(userProductsBought1);
      setUserProductsSold(userProductsSold1);
      setTableData(tableData1);
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
  const successPercentage = (totalProductsSold.length * 100) / totalProducts.length;
  if (user === undefined || loading) {
    return <div>
      <CircularProgress />
    </div>;
  }
  return (
    <div style={{
      flex: 1,
    }}>
      <PageTitle title="Dashboard" button={<Button
        variant="contained"
        size="medium"
        color="secondary"
        onClick={() => {
          props.history.push('/myauctions');
        }}
      >
        My Auctions
      </Button>} />
      <Grid container spacing={4}>
        {/** This widget is common to all users will give an update on the
           * total no of items put into auctions
           *
           * */}
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget
            title="WebApp Overview"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={'center'}>
                <Grid item xs={6}>
                  <Typography size="xl" weight="medium" noWrap>
                    {allUsers.length}&nbsp;Users
                    {/* Count of items sold this week */}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  {/* Chart to show the nos of items sold this week */}
                  <LineChart
                    width={100}
                    height={30}
                    data={[
                      { value: 10 },
                      { value: 15 },
                      { value: 10 },
                      { value: 17 },
                      { value: 18 },
                    ]}
                  >
                    <Line
                      type="natural"
                      dataKey="value"
                      stroke={theme.palette.success.main}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </Grid>
              </Grid>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Auctions
                </Typography>
                <Typography size="md">{totalProducts.length
                }{/* total no of auctions this week */}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Sold
                </Typography>
                <Typography size="md">{totalProductsSold.length
                }{/* Total no of successful auctions */}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                 Success
                </Typography>
                <Typography
                  size="md">{successPercentage}&nbsp;%
                  {/* Average Cost of items sold this week */}
                </Typography>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item lg={4} md={8} sm={6} xs={12}>
          <Widget
            title="My Transactions"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <div className={classes.performanceLegendWrapper}>
              <div className={classes.legendElement}>
                <Dot color="warning" />
                <Typography
                  color="text"
                  colorBrightness="secondary"
                  className={classes.legendElementText}
                >
                  Items bought
                </Typography>
              </div>
              <div className={classes.legendElement}>
                <Dot color="primary" />
                <Typography
                  color="text"
                  colorBrightness="secondary"
                  className={classes.legendElementText}
                >
                  Items put for sale
                </Typography>
              </div>
            </div>
            <div className={classes.progressSection}>
              <Typography
                size="md"
                color="text"
                colorBrightness="secondary"
                className={classes.progressSectionTitle}
              >
                Put for sale: {userProductsSold.length}
              </Typography>
              <LinearProgress
                variant="determinate"
                // no of items the user has sold or put for sale
                value={userProductsSold.length * 10}
                classes={{ barColorPrimary: classes.progressBarPrimary }}
                className={classes.progress}
              />
            </div>
            <div>
              <Typography
                size="md"
                color="text"
                colorBrightness="secondary"
                className={classes.progressSectionTitle}
              >
                Bought: {userProductsBought.length}
              </Typography>
              <LinearProgress
                variant="determinate"
                // no of items the user has bought this month
                value={userProductsBought.length * 10}
                classes={{ barColorPrimary: classes.progressBarWarning }}
                className={classes.progress}
              />
            </div>
          </Widget>
        </Grid>

        {/* This Grid will tell the no of transactions per category */}
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget title="Category Breakdown" upperTitle className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={144}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      innerRadius={40}
                      outerRadius={50}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                  {pieChartData.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography style={{ whiteSpace: 'nowrap', fontSize: 12 }} >
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary">
                        &nbsp;{value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        {/**
         * This line Chart will plot the no of items sold
         *  and the no of items bought by the user daily */}
        <Grid item xs={12}>
          <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Daily Line Chart
                </Typography>
                <div className={classes.mainChartHeaderLabels}>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="warning" />
                    <Typography className={classes.mainChartLegentElement}>
                      Put for Sale
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="primary" />
                    <Typography className={classes.mainChartLegentElement}>
                      Bought
                    </Typography>
                  </div>
                </div>
              </div>
            }
          >
            <ResponsiveContainer width="100%" minWidth={500} height={350}>
              <ComposedChart
                margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
                data={userProductsByDate}
              >
                <YAxis
                  ticks={[0, 1, 2, 5, 10]}
                  tick={{ fill: theme.palette.text.hint + '80', fontSize: 14 }}
                  stroke={theme.palette.text.hint + '80'}
                  tickLine={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fill: theme.palette.text.hint + '80', fontSize: 14 }}
                  stroke={theme.palette.text.hint + '80'}
                  tickLine={false}
                />
                <Area
                  type="natural"
                  dataKey="value"
                  fill={theme.palette.background.light}
                  strokeWidth={0}
                  activeDot={false}
                />
                <Line
                  type="natural"
                  dataKey="value1"
                  stroke={theme.palette.primary.main}
                  strokeWidth={2}
                  dot={false}
                  activeDot={false}
                />
                <Line
                  type="linear"
                  dataKey="value"
                  stroke={theme.palette.warning.main}
                  strokeWidth={2}
                  dot={{
                    stroke: theme.palette.warning.dark,
                    strokeWidth: 2,
                    fill: theme.palette.warning.main,
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Widget>
        </Grid>
        <Grid item xs={12}>
          <Widget
            title="My Items"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            {/* Feed the data of my items to this table */}
            <Table data={tableData} />
          </Widget>
        </Grid>
      </Grid>
    </div>
  );
}

// #######################################################################
// function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
//   const array = new Array(length).fill();
//   let lastValue;

//   return array.map((item, index) => {
//     let randomValue = Math.floor(Math.random() * multiplier + 1);

//     while (
//       randomValue <= min ||
//       randomValue >= max ||
//       (lastValue && randomValue - lastValue > maxDiff)
//     ) {
//       randomValue = Math.floor(Math.random() * multiplier + 1);
//     }

//     lastValue = randomValue;

//     return { value: randomValue };
//   });
// }

// function getMainChartData() {
//   const resultArray = [];
//   const tablet = getRandomData(31, 3500, 6500, 7500, 1000);
//   const desktop = getRandomData(31, 1500, 7500, 7500, 1500);
//   const mobile = getRandomData(31, 1500, 7500, 7500, 1500);

//   for (let i = 0; i < tablet.length; i++) {
//     resultArray.push({
//       tablet: tablet[i].value,
//       desktop: desktop[i].value,
//       mobile: mobile[i].value,
//     });
//   }

//   return resultArray;
// }

export default withRouter(Dashboard);
