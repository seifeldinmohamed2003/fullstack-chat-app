import express from 'express';
import { login, signup, logout } from '../controllers/auth.controller.js';
import generateToken from '../config/utils.js';
import dotenv from 'dotenv';
dotenv.config();


const router = express.Router();

router.post('/login',login);

router.post('/signup', signup);

router.post('/logout', logout); 

export default router;