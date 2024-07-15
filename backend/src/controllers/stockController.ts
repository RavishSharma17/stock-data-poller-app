import { Request, Response } from 'express';
import Stock from '../models/stockModel';

export const getRecentData = async (req: Request, res: Response) => {
  try {
    const { symbol } = req.params;
    const data = await Stock.find({ symbol }).sort({ timestamp: -1 }).limit(20);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
