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
exports.hasRole = exports.isAuthenticated = exports.isOwner = void 0;
const lodash_1 = require("lodash");
const User_1 = require("../models/User"); // Import UserModel here
// Middleware to check if the user is the owner
const isOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const currentUserId = (0, lodash_1.get)(req, 'identity._id', '');
        if (!currentUserId || currentUserId.toString() !== id) {
            return res.sendStatus(403); // Forbidden
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400); // Bad Request
    }
});
exports.isOwner = isOwner;
// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionToken = req.cookies['ANAS-AUTH'];
        if (!sessionToken) {
            return res.sendStatus(403); // Forbidden
        }
        const existingUser = yield User_1.UserModel.getUserBySessionToken(sessionToken); // Use the new method
        if (!existingUser) {
            return res.sendStatus(403); // Forbidden
        }
        (0, lodash_1.merge)(req, { identity: existingUser });
        next();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400); // Bad Request
    }
});
exports.isAuthenticated = isAuthenticated;
// Middleware to check user roles
const hasRole = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const currentUserId = (0, lodash_1.get)(req, 'identity._id', '');
            if (!currentUserId) {
                return res.sendStatus(403); // Forbidden
            }
            const userRole = (0, lodash_1.get)(req, 'identity.role', null);
            if (!userRole || !roles.includes(userRole)) {
                return res.sendStatus(403); // Forbidden
            }
            next();
        }
        catch (error) {
            console.log(error);
            res.sendStatus(400); // Bad Request
        }
    });
};
exports.hasRole = hasRole;
//# sourceMappingURL=roleMiddleware.js.map