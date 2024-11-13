import { Router } from 'express';
import { 
  createPrice, 
  getPriceById, 
  getAllPrices, 
  updatePrice, 
  deletePrice 
} from '../controllers/priceController';

const router = Router();

router.post('/prices', createPrice);
router.get('/prices/:id', getPriceById);
router.get('/prices', getAllPrices);

// Update a price by ID
router.put('/prices/:id', updatePrice);

// Delete a price by ID
router.delete('/prices/:id', deletePrice);

export default router;
