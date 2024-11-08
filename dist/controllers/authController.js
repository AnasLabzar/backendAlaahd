"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const helper_1 = require("../helper");
const User_1 = require("../models/User");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        // Fetch the user and explicitly cast it to `IUser | null`
        const user = (yield User_1.UserModel.findOne({ email }).select('+authentication.password +authentication.salt'));
        if (!user || !((_a = user.authentication) === null || _a === void 0 ? void 0 : _a.salt) || !user.authentication.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const expectedHash = (0, helper_1.authentication)(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) {
            return res.status(403).json({ message: 'Invalid credentials' });
        }
        const salt = (0, helper_1.random)();
        // Explicitly cast `_id` to `string` if TypeScript is still uncertain
        user.authentication.sessionToken = (0, helper_1.authentication)(salt, user._id.toString());
        yield user.save();
        res.cookie('ANAS-AUTH', user.authentication.sessionToken, {
            domain: 'https://backendalaahd.onrender.com',
            path: '/',
        });
        return res.status(200).json({ message: 'Login successful', user }).end();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});
exports.loginUser = loginUser;
// Register function
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username, nationality, role = 'customer', phone } = req.body;
        if (!email || !password || !username || !phone) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }
        const existingUser = yield User_1.UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = (0, helper_1.random)();
        const hashedPassword = (0, helper_1.authentication)(salt, password);
        const user = new User_1.UserModel({
            username,
            email,
            role,
            phone,
            nationality,
            authentication: {
                salt,
                password: hashedPassword,
            },
        });
        yield user.save();
        return res.status(201).json({ message: 'User registered successfully', user }).end();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});
exports.registerUser = registerUser;
//# sourceMappingURL=authController.js.map