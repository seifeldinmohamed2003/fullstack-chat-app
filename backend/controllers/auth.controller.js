import generateToken from '../config/utils.js';
import { connectDB } from '../config/db.js';
import express from 'express';
import mongoose from 'mongoose';
import User from '../models/usermodel.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
dotenv.config();


export const signup = async (req, res) => {
    const {username,email,password} = req.body;
    try {
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }   
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        if(newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({ message: 'User created successfully', user: { id: newUser._id, username: newUser.username, email: newUser.email } });

               }else {
            res.status(400).json({ message: 'User creation failed' });
        }



    }catch (error) {
        console.log('Error during signup:', error);
        res.status(500).json({ message: 'Error during signup', error: error.message });
    }   

}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
            return res.status(400).json({ message: 'Email and password are required' });
        }

    try{    
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }  

    

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        generateToken(user._id, res);
        res.status(200).json({ message: 'Login successful', user: { id: user._id, username: user.username, email: user.email, avatar: user.avatar } });


    }catch (error) {
        console.log('Error during login:', error);
        res.status(500).json({ message: 'Error during login', error: error.message });
    }


}       
export const logout = (req, res) => {
    try{
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({ message: 'Logout successful' });

    }catch (error) {
        console.log('Error during logout:', error);
        res.status(500).json({ message: 'Error during logout', error: error.message });
    }

}