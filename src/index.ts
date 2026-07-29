import express from 'express';
import cors from 'cors';
import 'dotenv/config';
const app = express();

//Middleware
app.use(express.json());
app.use(cors());

// Routes
import categoryRouter from './routes/categories.js';
app.use('/', categoryRouter)

import productRouter from './routes/products.js'
app.use('/', productRouter);

// DB connection
import { connectToDatabase } from './config/db.js';
connectToDatabase();

// Server
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})


