import express from 'express';
import { 
  getAllUsers, 
  getUsersById, 
  getUsersByRole, 
  deleteUser, 
  updateUser 
} from '../controllers/userController';

const router = express.Router();

// Route to get all users
router.get('/allusers', getAllUsers);

// Route to get a user by ID
router.get('/users/:id', getUsersById);

// Route to get users by their role (dynamic role)
router.get('/users/role/:role', getUsersByRole);

// Route to update a user by ID
router.put('/users/:id', updateUser);

// Route to delete a user by ID
router.delete('/users/:id', deleteUser);

export default router;
