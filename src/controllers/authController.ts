import express from 'express';
import { authentication, random } from '../helper';
import { UserModel, IUser } from '../models/User';
import mongoose from 'mongoose'; // Ensure mongoose is imported for ObjectId type

export const loginUser = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Fetch the user and explicitly cast it to `IUser | null`
        const user = (await UserModel.findOne({ email }).select('+authentication.password +authentication.salt')) as IUser | null;

        if (!user || !user.authentication?.salt || !user.authentication.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash) {
            return res.status(403).json({ message: 'Invalid credentials' });
        }

        const salt = random();
        
        // Explicitly cast `_id` to `string` if TypeScript is still uncertain
        user.authentication.sessionToken = authentication(salt, (user._id as mongoose.Types.ObjectId).toString());

        await user.save();

        res.cookie('ANAS-AUTH', user.authentication.sessionToken, {
            domain: 'https://backendalaahd.onrender.com',
            path: '/',
        });

        return res.status(200).json({ message: 'Login successful', user }).end();
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error', error: (error as Error).message });
    }
};

// Register function
export const registerUser = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username, nationality, role = 'customer', phone } = req.body;

        if (!email || !password || !username || !phone) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = random();
        const hashedPassword = authentication(salt, password);

        const user = new UserModel({
            username,
            email,
            role,
            phone,
            nationality,
            authentication: {
                salt,
                password: hashedPassword,
            },
        });

        await user.save();

        return res.status(201).json({ message: 'User registered successfully', user }).end();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error', error: (error as Error).message });
    }
};