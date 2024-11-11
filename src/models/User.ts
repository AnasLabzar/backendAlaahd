import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {

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
    fetchedAt: { type: Date, default: Date.now, required: true } // Add a 'fetchedAt' field of type Date
});

// Create and export the Invoice model
export const User = mongoose.model<IUser>('User', UserSchema);
