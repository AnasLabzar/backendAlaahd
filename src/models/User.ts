import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the interface for TypeScript with the new structure
export interface IUser extends Document {
  _id: Types.ObjectId; // Explicitly define _id type
  username: string;
  email: string;
  authentication: {
    password: string;
    salt?: string;
    sessionToken?: string;
  };
  role: string;
  score?: string;
  phone: string;
  fetchedAt?: Date;
  nationality?: string; // Add nationality here
}


// Define the User schema with the new structure
const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  role: {
    type: String,
    enum: ['admin', 'moder', 'custom', 'fourn'],
    default: 'custom',  // Default role
  },
  score: { type: String },
  phone: { type: String, required: true },
  fetchedAt: { type: Date, default: Date.now, required: true },
});

// Define the User model
export const UserModel = mongoose.model<IUser>('User', UserSchema);

// Define helper functions for interacting with the User model
export const getUsers = () => UserModel.find();
export const getUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email }).select('+authentication.salt +authentication.password');
};
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = async (userData: IUser) => {
  const user = new UserModel(userData);
  return await user.save();
};
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Partial<IUser>) =>
  UserModel.findByIdAndUpdate(id, values, { new: true });
export const getCustomers = () => UserModel.find({ role: 'custom' });
