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
const authController_1 = require("../controllers/authController");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const userController_1 = require("../controllers/userController");
exports.default = (router) => {
    router.post('/auth/register', authController_1.registerUser);
    router.post('/auth/login', authController_1.loginUser);
    // Add route to get user by session token
    router.get('/users/session/:sessionToken', roleMiddleware_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { sessionToken } = req.params;
            const user = yield (0, userController_1.getUserBySessionToken)(sessionToken);
            return res.status(200).json(user);
        }
        catch (error) {
            console.error('Error fetching user by session token:', error);
            return res.status(404).json({ error: 'User not found' });
        }
    }));
};
//# sourceMappingURL=authentication.js.map