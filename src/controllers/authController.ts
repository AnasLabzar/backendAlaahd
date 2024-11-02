import express from 'express';
import { authentication, random } from '../helper';
import { createUser, getUserByEmail } from '../models/User';
import { IUser } from '../models/User'; // Make sure to import IUser

// Login function
export const loginUser = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const user = await getUserByEmail(email) as IUser; // Type assertion

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Ensure salt is defined before using it
        if (!user.authentication?.salt || !user.authentication?.password) {
            return res.status(500).json({ message: 'User authentication details are not available.' });
        }

        // Generate hash with stored salt and compare to stored password
        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash) {
            return res.status(403).json({ message: 'Invalid credentials' });
        }

        // Generate session token and update the user’s authentication
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        // Set cookie for authentication token
        res.cookie('ANAS-AUTH', user.authentication.sessionToken, {
            domain: 'localhost',
            path: '/',
        });

        return res.status(200).json({ message: 'Login successful', user }).end();
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error', error: (error as Error).message });
    }
}

// Register function
export const registerUser = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username, nationality, role = 'customer', phone } = req.body;

        if (!email || !password || !username || !phone) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        // Check if the user already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate salt and hash the password
        const salt = random();
        const hashedPassword = authentication(salt, password);

        // Create a new user
        const user = await createUser({
            username,
            email,
            role,
            phone,
            nationality,
            authentication: {
                salt,
                password: hashedPassword,
            },
        } as IUser); // Type assertion

        return res.status(201).json({ message: 'User registered successfully', user }).end();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error', error: (error as Error).message });
    }
}
