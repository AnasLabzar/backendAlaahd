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
exports.updateUserById = exports.deleteUserById = exports.getUserBySessionToken = exports.getUserById = exports.getCustomerUsers = exports.getAllUsers = void 0;
const User_1 = require("../models/User");
// Get all SKUs
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.UserModel.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getAllUsers = getAllUsers;
// Function to get all customers
const getCustomerUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield User_1.UserModel.find({ role: 'custom' });
        res.status(200).json(customers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
exports.getCustomerUsers = getCustomerUsers;
// Function to get user by ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getUserById = getUserById;
// Function to get user by session token
const getUserBySessionToken = (sessionToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.UserModel.findOne({ 'authentication.sessionToken': sessionToken });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
});
exports.getUserBySessionToken = getUserBySessionToken;
// Function to delete user by ID
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield User_1.UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(deletedUser);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
});
exports.deleteUserById = deleteUserById;
// Function to update user
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { username } = req.body;
        if (!username) {
            return res.sendStatus(400);
        }
        const user = yield User_1.UserModel.findByIdAndUpdate(id, { username }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
});
exports.updateUserById = updateUserById;
//# sourceMappingURL=userController.js.map