const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const LogRoutes = require('./routes/LogRoute');
const UserRoutes = require('./routes/UserRoute');
const { authenticateJWT } = require('./controllers/UserController');

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

app.use('/api', authenticateJWT, LogRoutes);
app.use('/api', UserRoutes);

const port = 8000;
app.listen(port, () => {
  console.log('Listening at http://localhost:8000');
});
