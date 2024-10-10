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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUser = exports.getUserByCustom = exports.getUserById = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs")); // Use bcryptjs for hashing passwords
const User_1 = require("../models/User");
// Register a User with Password Hashing
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role } = req.body;
    try {
        const existingUser = yield User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const newUser = new User_1.User({
            username,
            email,
            password: hashedPassword, // Store hashed password
            role: role || 'customer' // Default role is customer
        });
        const savedUser = yield newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: savedUser });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.registerUser = registerUser;
// Log in a User with Password Comparison
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Compare the entered password with the hashed password in the database
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful', user });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.loginUser = loginUser;
// Get user by ID
// export const getUserById = async (req: Request, res: Response) => {
//   const userId = req.params._id;
//   try {
//     // Find the user by ID in the database
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     // Respond with the user data
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err });
//     // For other types of errors
//     res.status(500).json({ message: 'Server error', err });
//   }
// };
// Get a product by ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getUserById = getUserById;
const getUserByCustom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield User_1.User.find({ role: 'custom' }); // Ensure role is 'custom'
        if (!customers || customers.length === 0) {
            return res.status(404).json({ message: 'No users with the role custom found' });
        }
        res.json(customers);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
exports.getUserByCustom = getUserByCustom;
// Get all products
const getAllUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.find();
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getAllUser = getAllUser;
//# sourceMappingURL=authController.js.map