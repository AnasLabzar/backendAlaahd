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

        // Ensure the user data is correct
        console.log("User object:", user);

        const typedUser = user as IUser;

        // Log the password hash field to see if it's undefined
        console.log("Stored password hash:", typedUser.authentication?.password);

        if (!typedUser.authentication?.password) {
            return res.status(400).json({ message: "Password hash not found" });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, typedUser.authentication?.password);

        if (!isMatch) {
            return res.status(403).json({ message: "Invalid credentials" });
        }

        // If passwords match, generate and store the session token
        const salt = random();  // Create a new salt for session token
        typedUser.authentication.sessionToken = authentication(salt, typedUser._id.toString());

        // Save the updated user with the session token
        await typedUser.save();

        // Send the session token as a cookie in the response
        res.cookie('ANAS-AUTH', sessionToken, {
          httpOnly: true,   // Ensures the cookie can't be accessed from JavaScript
          secure: process.env.NODE_ENV === 'production',  // Set to true for HTTPS in production
          sameSite: 'Strict',  // This can also be 'Lax' or 'None', depending on your needs
          maxAge: 60 * 60 * 1000,  // Set expiry to 1 hour (or change as needed)
        });


        return res.status(200).json(typedUser);  // Return user object
    } catch (error) {
        console.log("Error during login:", error);
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

        const salt = await bcrypt.genSalt(10); // Generate salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

        // Generate a session token here (you can use your own method to generate the token)
        const sessionToken = authentication(random(), username);  // Replace with the actual logic

        // Create a new user object
        const user = new User({
            username,
            email,
            authentication: {
                password: hashedPassword,  // Store the hashed password here
                salt,  // Store the salt here
                sessionToken,  // Store the generated sessionToken here
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
