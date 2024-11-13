import { Router } from 'express';
import { 
  createOrder, 
  getOrderById, 
  getAllOrders, 
  updateOrder, 
  deleteOrder 
} from '../controllers/orderController';

const router = Router();

// Create a new order
router.post('/orders', createOrder);

// Get an order by ID
router.get('/orders/:id', getOrderById);

// Get all orders
router.get('/orders', getAllOrders);

// Update an order by ID
router.put('/orders/:id', updateOrder);

// Delete an order by ID
router.delete('/orders/:id', deleteOrder);

export default router;
