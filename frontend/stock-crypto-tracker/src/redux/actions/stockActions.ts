import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStockData = createAsyncThunk(
    'stock/fetchStockData',
    async (symbol: string) => {
        console.log("Getting latest data from backend")
        const response = await axios.get(`http://localhost:5800/api/stocks/${symbol}`);
        return response.data;
    }
);
