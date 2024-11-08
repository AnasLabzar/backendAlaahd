import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for TypeScript with the new structure
export interface IUser extends Document {
  username: string;
  email: string;
  authentication: {
    password: string;
    salt?: string;
    sessionToken?: string; // Add sessionToken here
  };
  role: string;
  score?: string;
  phone: string;
  fetchedAt?: Date;
  nationality?: string;
}

// Define the interface for the static method
interface IUserModel extends Model<IUser> {
  getUserBySessionToken(sessionToken: string): Promise<IUser | null>;
}

// Define the User schema
const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email: { type: String },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false }, // Define sessionToken in the schema
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

// Implement the static method on the schema
UserSchema.statics.getUserBySessionToken = async function (sessionToken: string) {
  return await this.findOne({ 'authentication.sessionToken': sessionToken }).select('+authentication.sessionToken');
};

// Export the UserModel with IUserModel as its type
export const UserModel = mongoose.model<IUser, IUserModel>('users', UserSchema);
