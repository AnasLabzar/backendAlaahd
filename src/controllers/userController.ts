import express from 'express';
import {
    deleteUserById,
    getCustomers,
    getUserByEmail,
    getUserBySessionToken,
    getUsers,
    getUserById, // Ensure function name is correct
} from '../models/User';

// Function to get all users
export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const getCustomerUsers = async (req: express.Request, res: express.Response) => {
    try {
        const customers = await getCustomers();
        if (!customers || customers.length === 0) {
            return res.status(404).json({ message: 'No users with the role customer found' });
        }
        res.json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: (error as Error).message });
    }
};

// Function to get user by ID
export const getUsersById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

// Function to get user by session token
export const getUsersBySessionToken = async (sessionToken: string) => {
    try {
        const user = await getUserBySessionToken(sessionToken);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        throw new Error('User not found');
    }
}

// Function to delete user by ID
export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUserById(id);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(deletedUser);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

// Function to update user's username
export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.sendStatus(400);
        }

        const user = await getUserById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.username = username;
        await user.save();

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}
