import express from 'express';
import { login, signup, logout, updateProfile } from '../controllers/auth.controller.js';
import generateToken from '../config/utils.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import dotenv from 'dotenv';
dotenv.config();


const router = express.Router();

router.post("/login",login);

router.post("/signup", signup);

router.post("/logout", logout); 

router.put("/update-profile",protectRoute,updateProfile);

export default router;