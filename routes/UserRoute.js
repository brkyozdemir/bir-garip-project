const express = require('express');
const { postSignup, postLogin, getDeneme } = require('../controllers/UserController');

const router = express.Router();

router.post('/signup', postSignup);
router.post('/login', postLogin);
router.get('/teapot', getDeneme);

module.exports = router;