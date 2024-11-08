import express from 'express';

import { login, register } from '../controllers/authentication';
import { isAuthenticated } from '../middlewares/index';
import { getUsersBySessionToken } from '../controllers/users';

export default (router: express.Router) => {
    router.post(`${path}/register`, register);
    router.post(`${path}/login`, login);
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

};
