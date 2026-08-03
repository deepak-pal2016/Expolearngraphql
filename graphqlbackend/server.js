/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');
const User = require('./src/models/users');
//const admin = require('./src/utils/firebase');
const server = require('http').createServer(app);
const PORT = 5000;

connectDB().then(() => {  
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log('DB connection failed', err);
  });
