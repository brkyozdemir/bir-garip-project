import { signup, login } from '../controllers/AuthController';
import express from 'express';
import {handle} from "../requests/signup";

const router = express.Router();

router.post('/signup', handle, signup);
router.post('/login', login);

export default router;