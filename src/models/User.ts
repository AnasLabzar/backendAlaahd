import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the interface for TypeScript with the new structure
export interface IUser extends Document {
  _id: Types.ObjectId;
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
  nationality?: string;
}

// Define the User schema
const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email: { type: String },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  role: {
    type: String,
    enum: ['admin', 'moder', 'custom', 'fourn'],
    default: 'custom',
  },
  score: { type: String },
  phone: { type: String, required: true },
  fetchedAt: { type: Date, default: Date.now, required: true },
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);
