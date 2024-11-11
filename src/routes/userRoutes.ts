import express from 'express'
import { getAllUsers, getUsersById } from '../controllers/userController'

const router = express.Router();

router.get('/allusers', getAllUsers);
router.get('/users/:id', getUsersById);
router.get('/users/customer', getUsersByRole);

export default router;
