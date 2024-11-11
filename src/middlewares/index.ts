import express from 'express';
import { get, merge } from 'lodash';

import { User } from '../models/User'; // Correct import of User model

// Middleware to check if the current user is the owner of the resource
export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId: unknown = get(req, 'identity._id');

        if (typeof currentUserId === 'string') {
            // currentUserId is a string
            if (currentUserId !== id) {
                return res.sendStatus(403); // Forbidden if the user is not the owner
            }
        } else {
            // Handle the case where currentUserId is not a string
            return res.sendStatus(401); // Unauthorized
        }

        next(); // Continue if the user is the owner
    } catch (error) {
        console.log(error);
        res.sendStatus(400); // Bad request in case of an error
    }
};

// Middleware to check if the user is authenticated
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['ANAS-AUTH'];

        if (!sessionToken) {
            return res.sendStatus(403); // Forbidden if there's no session token
        }

        // Assuming `User` is the correct model and it has a method `getUserBySessionToken`
        const existingUser = await User.findOne({ 'authentication.sessionToken': sessionToken });

        if (!existingUser) {
            return res.sendStatus(403); // Forbidden if no user is found with the session token
        }

        merge(req, { identity: existingUser }); // Attach the user to the request

        return next(); // Continue to the next middleware or route handler
    } catch (error) {
        console.log(error);
        res.sendStatus(400); // Bad request in case of an error
    }
};
