import { Router } from 'express';
import { 
  createProduct, 
  getProductById, 
  getAllProducts, 
  updateProduct, 
  deleteProduct 
} from '../controllers/productController';

const router = Router();

router.post('/products', createProduct);
router.get('/products/:id', getProductById);
router.get('/products', getAllProducts);

// Update a product by ID
router.put('/products/:id', updateProduct);

// Delete a product by ID
router.delete('/products/:id', deleteProduct);

export default router;
