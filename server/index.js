/* eslint-disable no-console */
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const user = require('./routes/users');
const product = require('./routes/product');
const comment = require('./routes/comment');
const getProduct = require('./routes/mapToProduct');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const editDetails = require('./routes/editDetails');
// const auth = require('./routes/auth');

// Configuing environment variables
dotenv.config();

const app = express();

// Setting up some constants
// const BASE_URL = '/';

const PORT = process.env.PORT || 8080;

// Parse the json body
app.use(express.json());
// Parse url encoded form data
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// app.use(BASE_URL, (req, res) => {
//   res.send('hello');
// });

// Setting routes for delegations
app.use(cors());
app.use(cookieParser());
app.use('/api/users/', user);
app.use('/api/product', product);
app.use('/api/comment', comment);
app.use('/getproduct', getProduct);
app.use('/editDetails', editDetails);

// app.use('/api/auth/', auth);
// use this to show the image you have in node js server to client (react js)
/**
 * https://stackoverflow.com/questions/48914987/
   send - image - path - from - node - js - express - server - to - react - client
 */

app.use('/uploads', express.static('uploads'));
// Setup the mongoDB connection
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/auctopus';
console.log(MONGODB_URL);

// connect to mongodb
mongoose.connect(
    MONGODB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
  // Start the App server
  // eslint-disable-next-line no-console
  console.log('Connected to mongoDB');
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log('Listening to server on '+ PORT));
})
    .catch((err) => {
      // If not connected , exit the process
      // eslint-disable-next-line no-console
      console.log('Error while connecting to mongoDB', err);
      process.exit(1);
    });
