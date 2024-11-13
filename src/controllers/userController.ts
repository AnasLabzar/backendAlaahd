import { Request, Response } from 'express';
import { User } from '../models/User';

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Get user by ID
export const getUsersById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get user by session token
export const getUsersBySessionToken = async (sessionToken: string) => {
  try {
    return await User.findOne({ 'authentication.sessionToken': sessionToken });
  } catch (error) {
    throw new Error('User not found');
  }
};

// Get users by role
export const getUsersByRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.params;
    const validRoles = ['admin', 'custom', 'fourn'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const users = await User.find({ role });
    if (users.length === 0) {
      return res.status(404).json({ message: `No users found with role "${role}"` });
    }
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Delete user by ID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update user by ID
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const updatedUser = await User.findByIdAndUpdate(id, { username }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
