import express from 'express';
import { get, merge } from 'lodash';
import { UserModel } from '../models/User'; // Import UserModel here

// Middleware to check if the user is the owner
export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id', '') as string;

        if (!currentUserId || currentUserId.toString() !== id) {
            return res.sendStatus(403); // Forbidden
        }

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(400); // Bad Request
    }
};

// Middleware to check if the user is authenticated
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['ANAS-AUTH'];

        if (!sessionToken) {
            return res.sendStatus(403); // Forbidden
        }

        const existingUser = await UserModel.getUserBySessionToken(sessionToken); // Use the new method

        if (!existingUser) {
            return res.sendStatus(403); // Forbidden
        }

        merge(req, { identity: existingUser });
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(400); // Bad Request
    }
};

// Middleware to check user roles
export const hasRole = (roles: string[]) => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const currentUserId = get(req, 'identity._id', '') as string;

            if (!currentUserId) {
                return res.sendStatus(403); // Forbidden
            }

            const userRole = get(req, 'identity.role', null) as string | null;

            if (!userRole || !roles.includes(userRole)) {
                return res.sendStatus(403); // Forbidden
            }

            next();
        } catch (error) {
            console.log(error);
            res.sendStatus(400); // Bad Request
        }
    };
};
