import express from 'express';

import { login, register } from '../controllers/authController';
import { isAuthenticated } from '../middlewares/index';
import { getUsersBySessionToken } from '../controllers/userController';

const router = express.Router();

router.post(`/auth/register`, register);
    router.post(`/auth/login`, login);
    // Add route to get user by session token
    router.get('/users/session/:sessionToken', isAuthenticated, async (req, res) => {
        try {
            const { sessionToken } = req.params;
            const user = await getUsersBySessionToken(sessionToken);
            return res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching user by session token:', error);
            return res.status(404).json({ error: 'User not found' });
        }
    });

export default router;
