import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { IUser } from '../models/User';


// Get all SKUs
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Function to get all customers
export const getCustomerUsers = async (req: Request, res: Response) => {
    try {
        const customers = await UserModel.find({ role: 'custom' });
        res.status(200).json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Function to get user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Function to get user by session token
export const getUserBySessionToken = async (sessionToken: string) => {
    const user = await UserModel.findOne({ 'authentication.sessionToken': sessionToken });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

// Function to delete user by ID
export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(deletedUser);
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
};

// Function to update user
export const updateUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;
        if (!username) {
            return res.sendStatus(400);
        }
        const user = await UserModel.findByIdAndUpdate(id, { username }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
};
