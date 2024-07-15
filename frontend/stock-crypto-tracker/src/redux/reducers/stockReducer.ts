import { createSlice } from '@reduxjs/toolkit';
import { fetchStockData } from '../actions/stockActions';

interface StockState {
    data: any[];
    symbol: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    lastFetchTime: number | null; // Timestamp when data was last fetched
}

const initialState: StockState = {
    data: [],
    symbol: 'bitcoin',
    status: 'idle',
    lastFetchTime: null,
};

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        setSymbol(state, action) {
            state.symbol = action.payload;
        },
        setLastFetchTime(state, action) {
            state.lastFetchTime = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStockData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStockData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.lastFetchTime = Date.now();
            })
            .addCase(fetchStockData.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { setSymbol, setLastFetchTime } = stockSlice.actions;

export default stockSlice.reducer;
