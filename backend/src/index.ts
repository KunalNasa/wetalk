import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB';
import { app, httpServer } from './socket/socket';
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.route"
import authRoutes from "./routes/auth.route"
import messageRoutes from "./routes/message.route"
import userModel from './models/user.model';
// import req from "./types/req"


dotenv.config();
app.use(express.json());
app.use(cookieParser());

connectDB();

const port = process.env.PORT || 8080;
app.get('/dummy', async (req, res) : Promise<any> => {
  try {
    const users = await userModel.find();
    return res.status(200).json({
      users : users
    })
  } catch (error : any) {
    return res.status(500).json({
      error : error.message
    })
  }
})
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

httpServer.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
