import express from 'express';
import { getAllUsers, getCustomerUsers, getUserById, deleteUserById, updateUserById } from '../controllers/UserController';

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/custom', getCustomerUsers);
router.get('/users/:id', getUserById);
router.delete('/users/:id', deleteUserById);
router.put('/users/:id', updateUserById);

export default router;
