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

// // Function to get user by session token
// export const getUsersBySessionToken = async (sessionToken: string) => {
//     try {
//         const user = await UserModel.getUserBySessionToken(sessionToken); // Corrected the function call here
//         return user;
//     } catch (error) {
//         throw new Error('User not found');
//     }
// }



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
