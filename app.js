"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = (0, express_1.default)();
const AuthRoutes = require('./routes/AuthRoute');
const APIRoutes = require('./routes/APIRoute');
const { authenticateJWT } = require('./middlewares/auth');
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRoutes);
app.use('/api', authenticateJWT, APIRoutes);
const port = 8000;
app.listen(port, () => {
    console.log('Listening at http://localhost:8000');
});
