import express from 'express'
import { getAllUsers, getUsersById } from '../controllers/userController'

const router = express.Router();

router.get('/allusers', getAllUsers);
router.get('/users/:id', getUsersById);

export default router;
