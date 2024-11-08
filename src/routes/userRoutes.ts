import express from 'express'

import { deleteUser, getAllUsers, updateUser, getUsersById } from '../controllers/userController'
import { isAuthenticated, isOwner } from '../middlewares/index';
// import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
    router.get('/allusers', getAllUsers);
    router.get('/users/:id', getUsersById);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
}
