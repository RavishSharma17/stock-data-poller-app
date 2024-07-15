import { Router } from 'express';
import { getRecentData } from '../controllers/stockController';

const router = Router();

router.get('/:symbol', getRecentData);

export default router;
