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

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    authentication: {
        password: { type: String, required: true },  // Ensure password is required
        salt: { type: String, required: true },
        sessionToken: { type: String },
    },
    role: { type: String, required: true },
    phone: { type: String, required: true },
    fetchedAt: { type: Date, default: Date.now },
});


// Export both the model and the interface
export const User = mongoose.model<IUser>('User', UserSchema);
