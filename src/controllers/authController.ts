import express from 'express';
import { authentication, random } from '../helper'; // Assuming these are helper functions
import { User } from '../models/User'; // Import the User model
import { IUser } from '../models/User'; // Import the User model
import bcrypt from 'bcrypt';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Extract password and salt from the user object
        const typedUser = user as IUser;

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, typedUser.authentication.password);

        if (!isMatch) {
            return res.status(403).json({ message: "Invalid credentials" });
        }

        // If passwords match, generate and store the session token
        const salt = random();  // Create a new salt for session token (or any random string generation method)
        typedUser.authentication.sessionToken = authentication(salt, typedUser._id.toString());

        // Save the updated user with the session token
        await typedUser.save();

        // Send the session token as a cookie in the response
        res.cookie('ANAS-AUTH', typedUser.authentication.sessionToken, {
            domain: 'localhost',  // Adjust based on your environment
            path: '/',
        });

        return res.status(200).json(typedUser);  // Return user object
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username, role, phone } = req.body;
        console.log(req.body);

        if (!email || !password || !username || !role || !phone) {
            return res.sendStatus(400);  // Bad request if any required fields are missing
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.sendStatus(400);  // User already exists
        }

        // Generate a salt using bcrypt's genSalt method
        const salt = await bcrypt.genSalt(10); // 10 rounds is default

        // Hash the password with the generated salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate a session token (random value or any preferred method)
        const sessionToken = authentication(random(), username);

        // Create a new user object
        const user = new User({
            username,
            email,
            authentication: {
                password: hashedPassword,
                salt,  // Store the salt
                sessionToken,  // Store the generated session token
            },
            role,
            phone,
            fetchedAt: new Date(),
        });

        // Save the new user to the database
        await user.save();

        return res.status(200).json(user);  // Return the created user
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);  // Handle errors
    }
};
