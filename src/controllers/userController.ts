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

// Function to get user by ID
export const getUsersById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // Extract id from request parameters
        const user = await User.findById(id);
        console.log(user);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ error: 'User not found' });
    }
}

// Function to get user by session token
export const getUsersBySessionToken = async (sessionToken: string) => {
    try {
        const user = await User.findOne({
            'authentication.sessionToken': sessionToken,
        });
        return user;
    } catch (error) {
        throw new Error('User not found');
    }
}


// Function to get all users with the role "custom"
export const getUsersByRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.params;

    // Check if the role is valid (this is just an example, you can modify the roles array)
    const validRoles = ['admin', 'custom', 'fourn']; // Example roles
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const users = await User.find({ role: role });

    if (users.length === 0) {
      return res.status(404).json({ message: `No users found with role "${role}"` });
    }

    return res.status(200).json(users);
  } catch (err) {
    console.error('Error in getUsersByRole:', err);
    return res.status(500).json({ error: (err as Error).message });
  }
};





// export const deleteUser = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const deletedUser = await UserModel.deleteUserById(id);
//         return res.json(deletedUser);
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(400)
//     }
// }

// export const updateUser = async (req: Request, res: Response) => {
//     try {
//         const { id } =  req.params;
//         const { username } = req.body;

//         if (!username) {
//             return res.sendStatus(400)
//         }

//         // Retrieve user by ID
//         const user = await UserModel.getUserById(id);

//         // Update user's username
//         user.username = username;

//         // Save the updated user
//         await user.save();

//         return res.status(200).json(user).end();
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(400);
//     }
// }
