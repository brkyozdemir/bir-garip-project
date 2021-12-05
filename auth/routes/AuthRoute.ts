import { signup, login } from '../controllers/AuthController';
import express from 'express';
import {SingupRequest} from "../requests/signup";

const router = express.Router();

router.post('/signup', new SingupRequest().handle, signup);
router.post('/login', login);

export default router;