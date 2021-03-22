const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const AuthRoutes = require('./routes/AuthRoute');
const APIRoutes = require('./routes/APIRoute');
const { authenticateJWT } = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/weirdo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', AuthRoutes)
app.use('/api', authenticateJWT, APIRoutes);

const port = 8000;
app.listen(port, () => {
  console.log('Listening at http://localhost:8000');
});
