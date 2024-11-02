import express from 'express';
import { getAllUsers, getUsersById, getCustomerUsers } from '../controllers/userController';
import { isAuthenticated, hasRole, isOwner } from '../middlewares/roleMiddleware'; // Adjust the path accordingly

const router = express.Router();


// Protected route (e.g., only admins can access this)
router.post('/admin-route', isAuthenticated, hasRole(['admin']), (req, res) => {
  res.send('Admin access granted');
});

// Example route that checks if the user is the owner
router.get('/user/:id', isAuthenticated, isOwner, getUsersById);
router.get('/users', getAllUsers);
router.get('/users/custom', getCustomerUsers);


export default router;
