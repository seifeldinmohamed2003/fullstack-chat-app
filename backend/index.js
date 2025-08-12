import express from 'express';
import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());



app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);


app.listen(PORT, () => {
    console.log('Server is running on port 3000');
    connectDB();
});