import 'dotenv/config';

import cors from 'cors';

import cookieParser from 'cookie-parser';

import express from 'express';

import dbConnection from './config/database.js';

import productRouter from './routes/productRoutes.js';

import userRouter from './routes/userRoutes.js';

let app = express();

app.use(cookieParser());

app.use(express.json());
