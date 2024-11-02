import express from 'express';
import { get, merge } from 'lodash';
import { getUserBySessionToken } from '../models/User';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id', '') as string;

        if (!currentUserId) {
            return res.sendStatus(403);
        }

        if (currentUserId.toString() !== id) {
            return res.sendStatus(403);
        }

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['ANAS-AUTH'];

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, { identity: existingUser });

        return next();
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
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

            // Check the user's role from the identity
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
