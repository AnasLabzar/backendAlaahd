import express from 'express';
import { authentication, random } from '../helper'; // Assuming these are helper functions
import { User } from '../models/User'; // Import the functions
import { IUser } from '../models/User'; // Import the IUser interface
import bcrypt from 'bcrypt';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        console.log("test1");

        if (!email || !password) {
            return res.sendStatus(400);
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.sendStatus(400);
        }

        console.log("test2");

        // Type assertion for user to be of type IUser
        const typedUser = user as IUser;

        // Log the whole user object to see if authentication and password are retrieved correctly
        console.log("User object:", typedUser);

        // Ensure that authentication and password fields exist
        if (!typedUser.authentication || !typedUser.authentication.password) {
            console.log("Stored password not found");
            return res.sendStatus(400);
        }

        // Log the password retrieved from DB and the one from the request
        console.log("Stored password: ", typedUser.authentication.password);
        console.log("Request password: ", password);

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, typedUser.authentication.password);

        if (!isMatch) {
            return res.sendStatus(403);
        }

        console.log("test3");

        // Expected hash comparison (you can remove this if bcrypt works as expected)
        const expectedHash = authentication(typedUser.authentication.salt, password);

        if (typedUser.authentication.password !== expectedHash) {
            return res.sendStatus(403);
        }

        const salt = random();
        typedUser.authentication.sessionToken = authentication(salt, typedUser._id.toString());

        await typedUser.save();

        res.cookie('ANAS-AUTH', typedUser.authentication.sessionToken, { domain: 'backendalaahd.onrender.com', path: '/' });
        
        return res.status(200).json(typedUser).end();
    } catch (error) {
        console.log("Error:", error);
        return res.sendStatus(400);
    }
};


export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username, role, phone } = req.body;
        console.log(req.body);

        if (!email || !password || !username || !role) {
            return res.sendStatus(400);
        }

        const existingUser = await User.findOne({ email });
        console.log("test1");
        if (existingUser) {
            return res.sendStatus(400);
        }

        // Use bcrypt to generate a salt with the desired number of rounds (e.g., 10 rounds)
        const salt = await bcrypt.genSalt(10);  // 10 rounds is the recommended default
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log("test2");

        // Create a new user instance
        const user = new User({
            username,
            email,
            authentication: {
                password: hashedPassword,
                salt,
                sessionToken: ''
            },
            role,
            phone,
            fetchedAt: new Date()
        });

        // Save the user instance
        await user.save();

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
