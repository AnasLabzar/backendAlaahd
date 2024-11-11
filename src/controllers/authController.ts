import express from 'express';
import { authentication, random } from '../helper'; // Assuming these are helper functions
import { User } from '../models/User'; // Import the User model
import bcrypt from 'bcrypt';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);  // Bad request if email or password is missing
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.sendStatus(400);  // User not found
        }

        // Use bcrypt to compare the input password with the stored hash
        const isMatch = await bcrypt.compare(password, user.authentication.password);

        if (!isMatch) {
            return res.sendStatus(403);  // Forbidden if password does not match
        }

        // If password matches, generate a session token and save it
        const salt = random();  // Generate a new salt for the session token
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        // Save the updated user with the new session token
        await user.save();

        // Send the session token as a cookie in the response
        res.cookie('ANAS-AUTH', user.authentication.sessionToken, {
            domain: 'localhost',  // Update the domain as per your deployment
            path: '/',
        });

        return res.status(200).json(user);  // Return the user object
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);  // Handle any errors
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
