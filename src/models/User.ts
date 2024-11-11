import mongoose, { Document, Schema } from 'mongoose';

// Define the IUser interface
export interface IUser extends Document {
    _id: mongoose.Types.ObjectId; // Explicitly define _id as mongoose Types.ObjectId
    username: string;
    email: string;
    authentication: {
        password: string;
        salt: string;
        sessionToken: string;
    };
    role: string;
    score: string;
    phone: string;
    fetchedAt: Date;
}

// Define the User Schema
const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false }
    },
    role: { type: String },
    score: { type: String },
    phone: { type: String, required: true },
    fetchedAt: { type: Date, default: Date.now, required: true }
});

// Export both the model and the interface
export const User = mongoose.model<IUser>('User', UserSchema);
