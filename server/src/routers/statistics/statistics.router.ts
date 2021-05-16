import { Router } from 'express';
import { statisticsController } from './statistics.controller';

const router = Router();

router.get('/average-price-per-seller-type', statisticsController.averagePricePerSellerType);
router.get('/distribution-by-make', statisticsController.distributionByMake);

// here more routes could be added...

export const statisticsRouter = router;
