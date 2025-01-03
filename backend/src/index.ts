import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB';
import { app, httpServer } from './socket/socket';
import cookieParser from "cookie-parser"

dotenv.config();
app.use(express.json());
app.use(cookieParser());

connectDB();

const port = process.env.PORT || 8080;



httpServer.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
