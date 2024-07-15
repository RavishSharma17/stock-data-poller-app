import axios from 'axios';
import Stock from '../models/stockModel';

const symbols = ['ethereum', 'bitcoin', 'gold', 'busd', 'dogecoin'];
const API_KEY = 'copy-your-api-key-here';

export const fetchAndStoreData = async () => {
  for (const symbol of symbols) {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd&x_cg_demo_api_key=${API_KEY}`);
      const data = response.data[symbol.toLowerCase()];
      console.log(`${symbol} price:`, data.usd);
      const price = data.usd;

      const newStock = new Stock({ symbol: symbol, price: price });
      await newStock.save();
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
    }
  }
};
