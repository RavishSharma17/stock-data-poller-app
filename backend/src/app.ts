import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import stockRoutes from './routes/stockRoutes';
import { fetchAndStoreData } from './services/stockService';

dotenv.config();

const app = express();

setInterval(fetchAndStoreData, 5000);

app.use(cors());
app.use(express.json());
app.use('/api/stocks', stockRoutes);

mongoose.connect(process.env.MONGO_URI!)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

export default app;
