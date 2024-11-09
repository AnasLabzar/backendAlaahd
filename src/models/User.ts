import mongoose from "mongoose";

interface UserDocument extends mongoose.Document {
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

const UserModelSchema = new mongoose.Schema<UserDocument>({
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

export class UserModel extends mongoose.Model<UserDocument> {
    static async getUsers() {
        return await this.find();
    }

    static async getUserByEmail(email: string) {
        return await this.findOne({ email });
    }

    static async getUserBySessionToken(sessionToken: string) {
        return await this.findOne({
            'authentication.sessionToken': sessionToken,
        });
    }

    static async getUserById(id: String) {
        return await this.findById(id);
    }

    static async createUser(values: UserDocument): Promise<UserDocument> {
        const user = new this(values);
        return (await user.save()).toObject();
    }

    static async deleteUserById(id: string) {
        return await this.findOneAndDelete({ _id: id });
    }

    static async updateUserById(id: string, values: Record<string, any>) {
        return await this.findByIdAndUpdate(id, values);
    }
}

export default UserModel;