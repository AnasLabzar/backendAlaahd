import express from 'express';
import { random, authentication } from '../helper';
import { UserModel } from '../models/userModel';

// Helper function to find user by email
const getUserByEmail = async (email: string) => {
    return await UserModel.findOne({ email }).select('+authentication.password +authentication.salt');
};

// Helper function to create a user
const createUser = async (userData: Partial<IUser>) => {
    const user = new UserModel(userData);
    return await user.save();
};

export const loginUser = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await getUserByEmail(email);

        if (!user || !user.authentication.salt) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash) {
            return res.status(403).json({ message: 'Invalid credentials' });
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('ANAS-AUTH', user.authentication.sessionToken, {
            domain: 'localhost',
            path: '/',
        });

        return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
