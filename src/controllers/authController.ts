import express from 'express';
import { authentication, random } from '../helper'; // Assuming these are helper functions
import { UserModel } from '../models/User'; // Import the functions
import bcrypt from 'bcrypt';


export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await UserModel.getUserByEmail(email);

        if (!user) {
            return res.sendStatus(400);
        }

        const isMatch = await bcrypt.compare(password, user.authentication.password);

        if (!isMatch) {
            return res.sendStatus(403);
        }


        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('ANAS-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username, role, phone } = req.body;

        if (!email || !password || !username || !role) {
            return res.sendStatus(400)
        }

        const existingUser = await UserModel.getUserByEmail(email);

        if (existingUser) {
            return res.sendStatus(400)
        }

        const salt = random();
        const plainTextPassword = req.body.password; // Assuming password is in req.body
        const hashedPassword = await bcrypt.hash(plainTextPassword, salt);

        // Assuming you have the user data in req.body
        const userData: UserModel = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword, // Assuming you have a hashed password
            salt: salt,
            role: req.body.role,
            phone: req.body.phone,
            // ... other fields as needed
        };

        const user = await UserModel.createUser(userData); // Pass the user data here

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
