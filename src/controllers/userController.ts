import express from 'express';
import { UserModel } from '../models/userModel';

// Get all users
export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get user by session token
export const getUserBySessionToken = async (sessionToken: string) => {
    const user = await UserModel.findOne({ 'authentication.sessionToken': sessionToken });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};
