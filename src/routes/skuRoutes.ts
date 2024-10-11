import { Router } from 'express';
import { createSKU, getSkuById, getAllSKUs } from '../controllers/skuControllers';

const router = Router();

// Create a new SKU
router.post('/skus', createSKU);

router.get('/skus/:id', getSkuById);
// Get all SKUs
router.get('/skus', getAllSKUs);



export default router;
