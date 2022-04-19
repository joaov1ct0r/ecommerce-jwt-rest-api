import 'dotenv/config';

import cors from 'cors';

import cookieParser from 'cookie-parser';

import express from 'express';

import dbConnection from './config/database.js';

import productRouter from './routes/productRoutes.js';

import userRouter from './routes/userRoutes.js';

let app = express();

dbConnection();

app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);

app.use('/api/products', productRouter);

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server running!');
});
