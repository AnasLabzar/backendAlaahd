import { Router } from 'express';
import { createSKU, getAllSKUs, getSkuById } from '../controllers/skuControllers';

const router = Router();

// Create a new SKU
router.post('/skus', createSKU);

// Get all SKUs
router.get('/skus', getAllSKUs);

router.get('/skus/:id', getSkuById);


export default router;
