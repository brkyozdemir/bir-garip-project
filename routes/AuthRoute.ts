const { postSignup, postLogin } = require('../auth/controllers/AuthController');
import express from 'express';

const router = express.Router();

router.post('/signup', postSignup);
router.post('/login', postLogin);

export default router;