import express from 'express'
import { get, merge } from 'lodash'

import { UserModel } from '../models/User'

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId: unknown = get(req, 'identity._id');

        if (typeof currentUserId === 'string') {
            // currentUserId is a string
            if (currentUserId !== id) {
                return res.sendStatus(403);
            }
        } else {
            // Handle the case where currentUserId is not a string
            return res.sendStatus(401);
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

        const existingUser = await UserModel.getUserBySessionToken(sessionToken);

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
